import {formatClock, formatDay, formatFullDate} from "./helpers.js";

export function getClockText() {
    const now = new Date();
    const day = formatDay(now);
    const date = formatFullDate(now);
    const time = formatClock(now);

    return {day, date, time}
}