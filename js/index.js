"use strict"
console.log('STS Angular Assessment 1 ✨');

const taskObj = {
    id: "…",
    title: "Prepare quarterly report",
    category: "work",   // work | personal | study
    priority: "high",   // low | medium | high
    isCompleted: false,
    createdAt: 1762603140000  // timestamp
}

// Todo: Convert to OOP master object later
let masterTaskList = [];

const initialTaskList = [
    {
        id: "a1",
        title: "Prepare quarterly report",
        category: "work",
        priority: "high",
        isCompleted: false,
        createdAt: 1762603140000,
    },
    {
        id: "b2",
        title: "Fix login page layout bug",
        category: "work",
        priority: "high",
        isCompleted: true,
        createdAt: 1762592640000,
    },
];

const CATEGORIES = ['work', 'personal', 'study'];
const PRIORITIES = ['low', 'medium', 'high'];

//region Local Storage
function writeToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value ?? []));
}

function readFromStorage(key) {
    return localStorage.getItem(key)
}
//endregion

function getTaskListFromStorage() {
    const raw = readFromStorage('tasks')

    try {
        return raw ? JSON.parse(raw) : [];
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
    writeToStorage('tasks', masterTaskList);
}

function addTask(title, category, priority = 'medium') {
    if (title.trim() === '') {
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

    masterTaskList = [...masterTaskList, task];
    return masterTaskList;
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


function deleteTask(taskId) {
    const taskIdx = findTaskIndex(taskId);

    masterTaskList = [...masterTaskList].filter((_, i) => i !== taskIdx);
    return masterTaskList;
}

function resetTaskList() {
    masterTaskList = [...initialTaskList];
    console.log('Task list has been reset!');
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


// Main function when startup
(function () {
    masterTaskList = getTaskListFromStorage();
})();