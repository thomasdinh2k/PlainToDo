//region Helpers
function findTaskIdx(taskId) {
    const taskIdx = taskList.findIndex(t => t.id === taskId);
    if (taskIdx < 0) {
        throw new Error(`Can't find given task with id "${taskId}"`);
    }

    return taskIdx
}

function isTaskValid(task) {
    const missingTaskShapeEntries = TASK_KEYS.filter(k => {
        if (!task.hasOwnProperty(k)) {
            console.error('Task shape invalid, missing key: ', k)
            return true;
        }
        return false;
    })

    const badDataEntries = Object.entries(task).filter(([key, value]) => {
        let isValid = true;

        if (
            key === 'id' &&
            typeof value !== "string"
        ) {
            console.error('Invalid ID', value);
            isValid = false;
        }

        if (
            key === 'title' &&
            (typeof value !== 'string' || value.trim() === '')
        ) {
            console.error('Invalid title:  ', value);
            isValid = false;
        }

        if (
            key === 'category' &&
            !CATEGORIES.includes(value)
        ) {
            console.error('Invalid category:  ', value);
            isValid = false;
        }

        if (
            key === 'priority' &&
            !PRIORITIES.includes(value)
        ) {
            console.error('Invalid priority:  ', value);
            isValid = false;
        }

        if (
            key === 'isCompleted' &&
            typeof value !== 'boolean'
        ) {
            console.error('Invalid completion state:  ', value);
            isValid = false;
        }

        if (
            key === 'createdAt' &&
            Number.isNaN(new Date(value).getTime())
        ) {
            console.error('Invalid creation time:  ', value);
            isValid = false;
        }

        return !isValid;
    })

    return missingTaskShapeEntries.length === 0 &&
        badDataEntries.length === 0;
}

function commit(callback) {
    callback();
    saveTasksToStorage();
    renderAllTasks();
    renderStats();
}
//endregion
