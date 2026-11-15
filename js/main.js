"use strict"

renderClock(getDateTime());
setInterval(() => {
    renderClock(getDateTime());
}, 1000)
getTasksFromStorage();
renderAllTasks();
renderStats();
renderIcons();
