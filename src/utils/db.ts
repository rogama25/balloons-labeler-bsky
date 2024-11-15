import {User} from "../types/db.js";

export async function upsertUser(handle: string, day: number, month: number) {
    const user = new User({handle, day, month})
    await user.save()
}