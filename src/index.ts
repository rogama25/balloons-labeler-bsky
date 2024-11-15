import {Bot, ChatMessage} from "@skyware/bot";
import 'dotenv/config'
import {upsertUser} from "./utils/db.js";
import {isValidDate} from "./utils/dates.js";
import "./db/config.js"
import {addTag, getTags, labelerServer, removeTag} from "./labeller/test.js";

const bot = new Bot({
    emitChatEvents: true
});
await bot.login({
    identifier: process.env.USER || "",
    password: process.env.PASSWORD || "",
});

bot.on("message", async (message: ChatMessage) => {
    try {
        const handle = await message.getSender().then(v => v.handle);
        const conversationId = message.conversationId;
        console.log(`Received message: ${message.text} from ${handle}`);
        // test the message against regex day and month
        const match = message.text.match(/^(\d{1,2})\/(\d{1,2})$/);
        if (match) {
            // Extract day and month
            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10);
            if (isValidDate(day, month)) {
                await upsertUser(handle, day, month)
                await bot.sendMessage({
                    conversationId: conversationId!,
                    text: `Birthday set to ${message.text}!`
                })
                return
            }
            await bot.sendMessage({
                conversationId: conversationId!,
                text: "Invalid date! Send your birthday in the format DD/MM"
            })
            return
        }
        if (message.text === "BETATEST-add") {
            addTag(message.senderDid)
            await bot.sendMessage({
                conversationId: conversationId!,
                text: "Labels added!"
            })
            return
        } if (message.text === "BETATEST-reset") {
            removeTag(message.senderDid)
            await bot.sendMessage({
                conversationId: conversationId!,
                text: "Labels reset!"
            })
            return
        } if (message.text === "BETATEST-get") {
            const tags = getTags(message.senderDid)
            await bot.sendMessage({
                conversationId: conversationId!,
                text: JSON.stringify(tags)
            })
            return
        }
        await bot.sendMessage({
            conversationId: conversationId!,
            text: "This is not a birthday! Send your birthday in the format DD/MM"
        });
    } catch (e) {
        console.error(e)
    }
});

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



