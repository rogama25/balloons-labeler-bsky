import {DateTime} from "luxon"
import {sortedLabels} from "../constants/labels.js";
import {Label} from "../types/labels.js";

export function isValidDate(day: number, month: number): boolean {
    if (month < 1 || month > 12) return false;
    return !(day < 1 || day > daysInMonth(month));

}

function daysInMonth(month: number): number {
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

function getNearestBirthday(birthdayDay: number, birthdayMonth: number): DateTime {
    const today = DateTime.now().setZone("Europe/Madrid").startOf("day")
    const currentYear: number = today.year

    const thisYearBirthday = DateTime.fromObject({year: currentYear, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")
    const nextYearBirthday = DateTime.fromObject({year: currentYear + 1, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")
    const previousYearBirthday = DateTime.fromObject({year: currentYear - 1, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")

    if (thisYearBirthday > today) {
        const daysUntilNext = Math.abs(thisYearBirthday.diff(today, "days").days)
        const daysSincePrevious = Math.abs(previousYearBirthday.diff(today, "days").days)

        return daysUntilNext <= daysSincePrevious ? thisYearBirthday : previousYearBirthday
    } else {
        const daysUntilNext = Math.abs(nextYearBirthday.diff(today, "days").days)
        const daysSincePrevious = Math.abs(thisYearBirthday.diff(today, "days").days)

        return daysUntilNext <= daysSincePrevious ? nextYearBirthday : thisYearBirthday
    }
}

function getNextBirthday(birthdayDay: number, birthdayMonth: number): DateTime {
    const today = DateTime.now().setZone("Europe/Madrid").startOf("day")
    const currentYear: number = today.year

    const thisYearBirthday = DateTime.fromObject({year: currentYear, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")
    const nextYearBirthday = DateTime.fromObject({year: currentYear + 1, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")

    return thisYearBirthday > today ? thisYearBirthday : nextYearBirthday
}

export function daysToNearestBirthday(birthdayDay: number, birthdayMonth: number): number {
    const today = DateTime.now().setZone("Europe/Madrid").startOf("day")
    const nearestBirthday = getNearestBirthday(birthdayDay, birthdayMonth)
    return today.diff(nearestBirthday, "days").days
}

export function getCurrentGroup(daysUntilNearest: number): Label | undefined {
    const label = sortedLabels.slice().reverse().find(label => label.startDays <= daysUntilNearest);
    if (!label || daysUntilNearest > label.endDays) return undefined
    return label
}

export function getNextUpdateDate(label: Label | undefined, birthdayDay: number, birthdayMonth: number): DateTime {
    let birthday = label ? getNearestBirthday(birthdayDay, birthdayMonth) : getNextBirthday(birthdayDay, birthdayMonth)
    return birthday.plus({days: label ? label.endDays : sortedLabels[0].startDays}).startOf("day")
}
