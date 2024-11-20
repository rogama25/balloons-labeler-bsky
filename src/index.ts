import {Bot, ChatMessage} from "@skyware/bot";
import 'dotenv/config'
import {upsertUser} from "./utils/db.js";
import {isValidDate} from "./utils/dates.js";
import "./db/config.js"
import {labelerServer} from "./labeler/labeler.js";
import {recalculateAll, recalculateNeeded} from "./utils/recalculate.js";
import {scheduleJob} from "node-schedule"
import dedent from "dedent";

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
                await upsertUser(did, day, month)
                await bot.sendMessage({
                    conversationId: conversationId!,
                    text: dedent`¡He establecido tu cumpleaños para el día ${day}/${month}! (DD/MM)
                    
                    Birthday set for ${day}/${month}!
                    
                    NOTA: Todavía estoy trabajando en el proyecto y faltan cosas por hacer, gracias por tu comprensión!
                    Si te ha gustado el proyecto, puedes compartirlo con tus amigos :)
                    
                    NOTE: I'm still working on the project and there are still things to do, thanks for your understanding!
                    If you like the project, you can share it with your friends!`
                })
                return
            }
            await bot.sendMessage({
                conversationId: conversationId!,
                text: dedent`¡Eso no es una fecha válida! (DD/MM)

                That is not a valid date! (DD/MM)`
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
            text: dedent`¡Eso no es un cumpleaños! Manda un mensaje que contenga únicamente la fecha en el formato DD/MM

            That is not a birthday! Send a message that contains only the date in the format DD/MM`
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



