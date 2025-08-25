import {User} from "../types/db.js";
import {Op} from "sequelize";
import {DateTime} from "luxon";
import {addTag, getCurrentTags, removeTag} from "../labeler/labeler.js";
import {daysToNearestBirthday, getCurrentGroup, getNextUpdateDate} from "./dates.js";
import {sortedLabels} from "../constants/labels.js";

export async function recalculateAll() {
    const allUsers = await User.findAll()
    for (const user of allUsers) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await recalculateUser(user)
    }
}

export async function cleanAll() {
    const allUsers = await User.findAll()
    for (const user of allUsers) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await cleanUser(user)
    }
}
export async function cleanUser(user: User) {
    sortedLabels.forEach(l => removeTag(user.did, l.id))
}

export async function recalculateUser(user: User) {
    const currentLabels = getCurrentTags(user.did)
    const daysDiff = daysToNearestBirthday(user.day, user.month)
    const newTag = getCurrentGroup(daysDiff)

    if (currentLabels.size > 0) {
        let exists = false;
        if (newTag) {
            exists = currentLabels.delete(newTag.id)
        }
        currentLabels.forEach(v => removeTag(user.did, v))
        if (!exists && newTag) {
            addTag(user.did, newTag.id)
        }
    } else {
        if (newTag) {
            addTag(user.did, newTag.id)
        }
    }

    user.nextUpdate = getNextUpdateDate(newTag, user.day, user.month).toJSDate()
    await user.save()
}

export async function deleteTags(did: string) {
    const currentLabels = getCurrentTags(did)
    currentLabels.forEach(v => removeTag(did, v))
}

export async function recalculateNeeded() {
    const users = await User.findAll({
        where: {
            nextUpdate: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.lte]: DateTime.now().toJSDate()
                }
            }
        }
    })
    for (const user of users) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await recalculateUser(user)
    }
}