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

export function daysToNearestBirthday(birthdayDay: number, birthdayMonth: number): number {
    const today = DateTime.now().setZone("Europe/Madrid").startOf("day")
    const currentYear: number = today.year

    const thisYearBirthday = DateTime.fromObject({year: currentYear, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")
    const nextYearBirthday = DateTime.fromObject({year: currentYear + 1, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")
    const previousYearBirthday = DateTime.fromObject({year: currentYear - 1, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")

    let daysUntilNext: number;
    let daysSincePrevious: number;

    if (thisYearBirthday > today) {
        daysUntilNext = thisYearBirthday.diff(today, "days").days
        daysSincePrevious = previousYearBirthday.diff(today, "days").days
    } else {
        daysUntilNext = nextYearBirthday.diff(today, "days").days
        daysSincePrevious = thisYearBirthday.diff(today, "days").days
    }

    return daysUntilNext <= daysSincePrevious ? -daysUntilNext : daysSincePrevious
}

export function getCurrentGroup(daysUntilNearest: number): Label | undefined {
    return sortedLabels.reverse().find(label => label.startDays <= daysUntilNearest);
}

export function getNextUpdateDate(label: Label | undefined, birthdayDay: number, birthdayMonth: number): DateTime {
    const today = DateTime.now().setZone("Europe/Madrid").startOf("day")
    const thisYearBirthday = DateTime.fromObject({year: today.year, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").startOf("day")
    const year = thisYearBirthday > today ? today.year + 1 : today.year
    return DateTime.fromObject({year: year, month: birthdayMonth, day: birthdayDay}).setZone("Europe/Madrid").plus({days: label ? label.endDays : sortedLabels[0].startDays}).startOf("day")
}
