import {isNewTaskValid} from "./task-validation.js";

export function addTask(masterTaskList, { title, category, priority }) {
    if (!isNewTaskValid({title, category, priority})) {
        throw new Error('Task invalid');
    }

    const task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        category,
        priority,
        isCompleted: false,
        createdAt: Date.now()
    };

    return [...masterTaskList, task];
}

export function toggleTask(masterTaskList, taskId) {
    const taskIdx = findTaskIndex(masterTaskList, taskId);
    const task = masterTaskList[taskIdx];
    masterTaskList = masterTaskList.with(taskIdx, { ...task, isCompleted: !task.isCompleted })
    return [...masterTaskList];
}

export function deleteTask(masterTaskList, taskId) {
    masterTaskList = masterTaskList.filter(t => t.id !== taskId);
    return [...masterTaskList];
}

function findTaskIndex(masterTaskList, taskId) {
    const idx = masterTaskList.findIndex(t => t.id === taskId);
    if (idx < 0) throw new Error(`Can't find task with id "${taskId}"`);
    return idx;
}