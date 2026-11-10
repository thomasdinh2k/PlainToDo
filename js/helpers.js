// Created once and reused. Building a new Intl.DateTimeFormat is the slow part,
// so we don't want to do it on every call.
const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short', // "Sun"
    month: 'short',   // "Nov"
    day: 'numeric',   // "8"
    year: 'numeric',  // "2026"
    hour: 'numeric',  // "6"
    minute: '2-digit',// "39"
    hour12: true      // "PM"
});

// Header clock: each one is created once and reused every second
const dayFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',   // "Sunday"
});

const fullDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',     // "November"
    day: 'numeric',    // "8"
    year: 'numeric',   // "2026"
});

const clockFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',   // "7"
    minute: '2-digit', // "25"
    second: '2-digit', // "10"  → "7:25:10 PM"
});

export function formatDay(date)      { return dayFormatter.format(date); }
export function formatFullDate(date) { return fullDateFormatter.format(date); }
export function formatClock(date)    { return clockFormatter.format(date); }
// Turns a timestamp (ms) into text like "Sun, Nov 8, 2026, 6:39 PM"
export function formatFullDateTime(timeStamp) {
    return dateFormatter.format(timeStamp);
}

export function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
