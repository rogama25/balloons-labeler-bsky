import {db} from "./db/config.js";

try {
    await db.sync({alter: true});
    console.log("DB sync done")
} catch (e) {
    console.error(`DB sync failed ${e}`)
}