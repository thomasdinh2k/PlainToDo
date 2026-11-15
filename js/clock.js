function renderClock({ dayStr, dateStr, timeStr }) {
    const clockEl = {
        "date.of.week": {selector: ".date > span:first-child", value: dayStr },
        "date": {selector: ".date > span:last-child", value: dateStr},
        "clock": {selector: ".time > span", value: timeStr},
    };

    Object.values(clockEl).forEach(({ selector, value}) => {
        const el = document.querySelector(selector);
        el.textContent = value;
    });
}

function getDateTime() {
    const now = new Date();

    const dayStr = now.toLocaleDateString('en-US', {
        weekday: "long",
    })

    const dateStr = now.toLocaleDateString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'long'
    })

    const timeStr = now.toLocaleTimeString('en-US', {
        hour12: true
    })

    return {
        dayStr,
        dateStr,
        timeStr,
    }
}
