function saveTasksToStorage() {
    try {
        const dataStr = JSON.stringify(taskList);
        localStorage.setItem(STORAGE_KEY.tasks, dataStr);
    } catch (e) {
        console.error("Failed to save task to storage");
    }
}

function getTasksFromStorage() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY.tasks))
        taskList = data ?? [];
    } catch (e) {
        console.error("Failed to retrieve local storage data");
    }
}
