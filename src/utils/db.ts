import {User} from "../types/db.js";

export async function upsertUser(did: string, day: number, month: number) {
    return User.upsert({did, day, month, nextUpdate: null})
}

export async function deleteUser(did: string) {
    await User.destroy({where: {did}})
}