import {LabelerServer} from "@skyware/labeler";

export const labelerServer = new LabelerServer({did: process.env.DID || "", signingKey: process.env.SIGNING_KEY || "", dbPath: "labels/labels.db"})

export function addTag(did: string) {
    labelerServer.createLabels({uri: did}, {create: ["today"]})
}

export function removeTag(did: string) {
    labelerServer.createLabels({uri: did}, {negate: ["today"]})
}

export function getTags(did: string) {
    return labelerServer.db.prepare(`SELECT * FROM labels WHERE uri = ?`).all(did)
}