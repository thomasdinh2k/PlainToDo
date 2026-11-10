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

// Turns a timestamp (ms) into text like "Sun, Nov 8, 2026, 6:39 PM"
export function formatDate(timeStamp) {
    return dateFormatter.format(timeStamp);
}

export function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
