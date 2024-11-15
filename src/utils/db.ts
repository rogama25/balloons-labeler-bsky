import {User} from "../types/db.js";

export async function upsertUser(handle: string, day: number, month: number) {
    await User.upsert({handle, day, month})
}