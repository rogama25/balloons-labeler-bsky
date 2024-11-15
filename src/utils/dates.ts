export function isValidDate(day: number, month: number): boolean {
    if (month < 1 || month > 12) return false;
    return !(day < 1 || day > daysInMonth(month));

}

function daysInMonth(month: number): number {
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}