import {User} from "../types/db.js";

export async function upsertUser(did: string, day: number, month: number) {
    await User.upsert({did, day, month})
}