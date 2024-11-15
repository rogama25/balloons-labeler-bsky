import {LabelerServer} from "@skyware/labeler";

export const labelerServer = new LabelerServer({did: process.env.DID || "", signingKey: process.env.SIGNING_KEY || "", dbPath: "labels/labels.db"})

export function addTag(did: string, tag: string) {
    labelerServer.createLabels({uri: did}, {create: [tag]})
}

export function removeTag(did: string, tag: string) {
    labelerServer.createLabels({uri: did}, {negate: [tag]})
}

export function getCurrentTags(did: string) {
    const results: {val: string, neg: boolean}[] = labelerServer.db.prepare(`SELECT * FROM labels WHERE uri = ?`).all(did) as any

    return results.reduce((set, label) => {
        if (!label.neg) set.add(label.val);
        else set.delete(label.val);
        return set;
    }, new Set<string>());
}