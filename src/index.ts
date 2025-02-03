import {Bot, ChatMessage} from "@skyware/bot";
import 'dotenv/config'
import {deleteUser, upsertUser} from "./utils/db.js";
import {isValidDate} from "./utils/dates.js";
import "./db/config.js"
import {labelerServer} from "./labeler/labeler.js";
import {deleteTags, recalculateAll, recalculateNeeded, recalculateUser} from "./utils/recalculate.js";
import {scheduleJob} from "node-schedule"
import dedent from "dedent";
import {User} from "./types/db.js";

const bot = new Bot({
    emitChatEvents: true,
    eventEmitterOptions: {
        pollingInterval: 5
    }
});
await bot.login({
    identifier: process.env.USER || "",
    password: process.env.PASSWORD || "",
});

bot.on("message", async (message: ChatMessage) => {
    try {
        const sender = await message.getSender();
        const conversationId = message.conversationId;
        const handle = sender.handle
        const did = sender.did
        console.log(`Received message: ${message.text} from ${handle}`);
        // test the message against regex day and month
        const match = message.text.match(/^(\d{1,2})\/(\d{1,2})$/);
        if (match) {
            // Extract day and month
            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10);
            if (isValidDate(day, month)) {
                const newUser = await upsertUser(did, day, month)
                if (newUser instanceof User) {
                    await recalculateUser(newUser)
                }
                await bot.sendMessage({
                    conversationId: conversationId!,
                    text: dedent`¡He establecido tu cumpleaños para el día ${day}/${month}! (DD/MM)
                    
                    Birthday set for ${day}/${month}!
                    
                    NOTA: Todavía estoy trabajando en el proyecto y faltan cosas por hacer, gracias por tu comprensión!
                    Si te ha gustado el proyecto, puedes compartirlo con tus amigos :)
                    Si quieres eliminar tu cumpleaños, escribe "/delete", sin las comillas.
                    
                    NOTE: I'm still working on the project and there are still things to do, thanks for your understanding!
                    If you like the project, you can share it with your friends!
                    If you'd like to delete your birthday, type "/delete", without the quotation marks.`
                })
                return
            }
            await bot.sendMessage({
                conversationId: conversationId!,
                text: dedent`¡Eso no es una fecha válida! (DD/MM). Si quieres eliminar tu cumpleaños, escribe "/delete", sin las comillas.

                That is not a valid date! (DD/MM). If you'd like to delete your birthday, type "/delete", without the quotation marks.`
            })
            return
        }
        if (message.text.toLowerCase().trim() === "/delete") {
            await deleteUser(did)
            await deleteTags(did)
            await bot.sendMessage({
                conversationId: conversationId!,
                text: dedent`¡He eliminado tu cumpleaños! Sentimos que te vayas, para cualquier sugerencia contacta con @rogama25.es
                
                I've deleted your birthday! We're sorry to see you go, for any suggestions contact @rogama25.es`
            })
            return
        }
        if (message.text.toLowerCase().trim() === "/recalculate" && message.senderDid === process.env.ADMIN_DID) {
            await recalculateAll();
            await bot.sendMessage({
                conversationId: conversationId!,
                text: dedent`Recalculados todos los usuarios

                Recalculated all users`
            })
            return
        }
        await bot.sendMessage({
            conversationId: conversationId!,
            text: dedent`¡Eso no es un cumpleaños! Manda un mensaje que contenga únicamente la fecha en el formato DD/MM. O escribe "/delete" para eliminar tu cumpleaños.
            (Si tienes alguna duda, contacta con @rogama25.es)

            That is not a birthday! Send a message that contains only the date in the format DD/MM. Or type "/delete" to delete your birthday.
            (If you have any questions, contact @rogama25.es)`
        });
    } catch (e) {
        console.error(e)
    }
});

scheduleJob("*/5 * * * *", async () => {
    await recalculateNeeded()
})

labelerServer.app.listen({port: 4100, host: "::"}, (error, address) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(`Server listening on ${address}`);
})

bot.on("open", () => {
    console.log("Bot is open");
})

console.log("Bot started");



