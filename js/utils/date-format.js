const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short', // "Sun"
    month: 'short',   // "Nov"
    day: 'numeric',   // "8"
    year: 'numeric',  // "2026"
    hour: 'numeric',  // "6"
    minute: '2-digit',// "39"
    hour12: true      // "PM"
});

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