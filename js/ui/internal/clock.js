import {setText} from "./dom.js";
import {formatClock, formatDay, formatFullDate} from "../../utils/date-format.js";

export function getClockText(now = new Date()) {
    return {
        day: formatDay(now),
        date: formatFullDate(now),
        time: formatClock(now),
    };
}

export function renderClock(clockEls, { day, date, time }) {
    setText(clockEls.time, time);
    setText(clockEls.day, day);
    setText(clockEls.date, date);
}

export function bindClock(clockEls, { onClick }) {
    clockEls.root.addEventListener('click', onClick);
}