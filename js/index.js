import {CATEGORIES, PRIORITIES, STORAGE_KEY, TASK_KEYS} from "./constants.js";
import {bindClock, bindEvent, render, renderCategoryCounts, renderClock, renderStat} from "./render.js";
import {getClockText} from "./clock.js";
import {bindForm} from "./form.js";
import {mockTaskList} from "../mock/tasks.js";

// Todo: Convert to OOP master object later
let masterTaskList = [];

//region Local Storage
function writeToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value ?? []));
    } catch (e) {
        console.log("Error while writing to storage", e);
    }
}

function readFromStorage(key) {
    return localStorage.getItem(key)
}
//endregion

function getTaskListFromStorage() {
    const raw = readFromStorage(STORAGE_KEY.tasks)

    try {
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        throw new Error('Error while getting tasks from storage', { cause: e });
    }
}

function filterTasks({ category, priority, isCompleted } = {}) {
    let filtered = masterTaskList

    if (category !== undefined) {
        filtered = filtered.filter((t) => t.category === category)
    }

    if (priority !== undefined) {
        filtered = filtered.filter(t => t.priority === priority)
    }

    if (isCompleted !== undefined) {
        filtered = filtered.filter(t => t.isCompleted === isCompleted);
    }

    return filtered
}


function saveTaskList() {
    writeToStorage(STORAGE_KEY.tasks, masterTaskList);
}

function addTask({ title, category, priority }) {
    if (
        typeof title !== 'string' ||
        title.trim() === ''
    ) {
        throw new Error('Task title can\'t be empty');
    }

    if (!CATEGORIES.includes(category) || !PRIORITIES.includes(priority)) {
        throw new Error('Invalid category or priority')
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

function findTaskIndex(taskId) {
    const idx = masterTaskList.findIndex(t => t.id === taskId);
    if (idx < 0) throw new Error(`Can't find task with id "${taskId}"`);
    return idx;
}

function toggleTask(taskId) {
    const taskIdx = findTaskIndex(taskId);
    const task = masterTaskList[taskIdx];
    masterTaskList = masterTaskList.with(taskIdx, { ...task, isCompleted: !task.isCompleted })
    return masterTaskList;
}


export function deleteTask(taskId) {
    masterTaskList = masterTaskList.filter(t => t.id !== taskId);
    return masterTaskList;
}

// Fill an empty list with the mock tasks; does nothing if tasks already exist
function seedIfEmpty() {
    if (masterTaskList.length > 0) return;
    commit([...mockTaskList]);
}

function getStat() {
    const calculateStatOnPriority = (priority) => {
        // Stats does not count completed items
        return filterTasks({ priority, isCompleted: false }).length;
    }

    return {
        total: filterTasks().length,
        active: filterTasks({ isCompleted: false }).length,
        done: filterTasks({ isCompleted: true }).length,
        high: calculateStatOnPriority("high"),
    }
}

function getCategoryCounts() {
    return {
        all: filterTasks().length,
        ...Object.fromEntries(
            CATEGORIES.map(c => [
                c,
                filterTasks({ category: c }).length
            ])
        )
    }
}

// To make sure every "changes" is saved to storage + rendered
export function commit(newTaskList) {
    masterTaskList = newTaskList;
    saveTaskList();
    render(masterTaskList);
    renderStat(getStat());
    renderCategoryCounts(getCategoryCounts());
}

// Filter invalid task list to prevent error if user modify directly from localStorage
function isTaskValid(t) {
    // Case 1: Check valid shape
    if (t === null || typeof t !== 'object') return false

    // Case 2: Have all valid keys
    if (!TASK_KEYS.every(k => Object.hasOwn(t, k))) return false

    // Case 3: Valid categories & priorities
    return CATEGORIES.includes(t.category) && PRIORITIES.includes(t.priority);
}

// Main function when startup
(function () {
    let tasks
    try {
        tasks = getTaskListFromStorage().filter(t => isTaskValid(t));
    } catch (e) {
        console.error(e);
        tasks = [];
    }

    commit(tasks)

    bindEvent({
        onDelete: (id) => commit(deleteTask(id)),
        onToggle: (id) => commit((toggleTask(id)))
    });

    bindForm({
        onAddTask: (formData) => commit(addTask(formData)),
    })

    bindClock({ onClick: seedIfEmpty });

    renderClock(getClockText());
    setInterval(() => renderClock(getClockText()), 1000);
})();