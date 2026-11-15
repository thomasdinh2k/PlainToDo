let taskList = [];

function getTaskList(query = {}) {
    return taskList;
}

function createTask({ title, category, priority }) {
    const task = {
        id: crypto.randomUUID(),
        title,
        category,
        priority,
        isCompleted: false,
        createdAt: Date.now()
    }

    if (!isTaskValid(task)) {
        console.warn('Invalid task, will not push to task list', task);
        return
    };

    taskList.unshift(task);
    console.info('Task created successfully!');
    return getTaskList();
}

function deleteTask(taskId) {
    try {
        taskList.splice(findTaskIdx(taskId), 1);
        console.info(`Task ${taskId} deleted successfully!`);
        return getTaskList();
    } catch (e) {
        console.error("Error while deleting task", { cause: e });
    }
}

function toggleTask(taskId) {
    try {
        const taskIdx = findTaskIdx(taskId)
        taskList[taskIdx] = { ...taskList[taskIdx], isCompleted: !taskList[taskIdx].isCompleted }
        console.info(`Task ${taskId} status toggled!`);
    } catch (e) {
        console.error("Error while toggling task", { cause: e })
    }
}