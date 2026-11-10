import {CATEGORIES, PRIORITIES, STORAGE_KEY} from "./constants.js";
import {bindEvent, render} from "./render.js";

// Todo: Convert to OOP master object later
let masterTaskList = [];

const initialTaskList = [
    {
        id: "t1",
        title: "Prepare quarterly report",
        category: "work",
        priority: "high",
        isCompleted: false,
        createdAt: 1794137940000, // Sun, Nov 8, 2026, 6:39 PM
    },
    {
        id: "t2",
        title: "Fix login page layout bug",
        category: "work",
        priority: "high",
        isCompleted: true,
        createdAt: 1794128640000, // Sun, Nov 8, 2026, 4:04 PM
    },
    {
        id: "t3",
        title: "Book dentist appointment",
        category: "personal",
        priority: "medium",
        isCompleted: false,
        createdAt: 1794050040000, // Sat, Nov 7, 2026, 6:14 PM
    },
    {
        id: "t4",
        title: "Read CSS grid chapter",
        category: "study",
        priority: "low",
        isCompleted: false,
        createdAt: 1793966040000, // Fri, Nov 6, 2026, 6:54 PM
    },
    {
        id: "t5",
        title: "Renew gym membership",
        category: "personal",
        priority: "low",
        isCompleted: true,
        createdAt: 1793876040000, // Thu, Nov 5, 2026, 5:54 PM
    },
    {
        id: "t6",
        title: "Practice async JavaScript",
        category: "study",
        priority: "medium",
        isCompleted: false,
        createdAt: 1793792040000, // Wed, Nov 4, 2026, 6:34 PM
    },
];

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
    writeToStorage(STORAGE_KEY.tasks, masterTaskList);
}

function addTask(title, category, priority = 'medium') {
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


export function deleteTask(taskId) {
    masterTaskList = masterTaskList.filter(t => t.id !== taskId);
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

// To make sure every "changes" is saved to storage + rendered
export function commit(newTaskList) {
    masterTaskList = newTaskList;
    saveTaskList();
    render(masterTaskList);
}


// Main function when startup
(function () {
    let tasks
    try {
        tasks = getTaskListFromStorage();
    } catch (e) {
        console.error(e);
        tasks = [];
    }

    commit(tasks)

    bindEvent({
        onDelete: (id) => commit(deleteTask(id)),
        onToggle: (id) => commit((toggleTask(id)))
    });
})();