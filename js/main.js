console.log("Redo Assignment 1");

const STORAGE_KEY = { tasks: "plaintodo.tasks" }
const CATEGORIES = Object.freeze(['work', 'personal', 'study']);
const PRIORITIES = Object.freeze(['low', 'medium', 'high']);
const TASK_KEYS = Object.freeze(['id', 'title', 'category', 'priority', 'isCompleted', 'createdAt'])
const SELECTORS = Object.freeze({
    TASK_ITEM: '#task-items',
    FORM: '#add-form',
    DELETE_BUTTON: '.btn-delete',
    CHECK_BOX_BUTTON: '.checkbox',
})

const mockTaskList = [
    {
        id: "m01",
        title: "Prepare quarterly report",
        category: "work",
        priority: "high",
        isCompleted: false,
        createdAt: 1762617600000,
    },
    {
        id: "m02",
        title: "Fix login page layout bug",
        category: "work",
        priority: "high",
        isCompleted: true,
        createdAt: 1762599600000,
    },
    {
        id: "m03",
        title: "Reply to client emails",
        category: "work",
        priority: "medium",
        isCompleted: false,
        createdAt: 1762581600000,
    },
    {
        id: "m04",
        title: "Update team wiki page",
        category: "work",
        priority: "low",
        isCompleted: true,
        createdAt: 1762563600000,
    },
    {
        id: "m05",
        title: "Review pull request for checkout flow",
        category: "work",
        priority: "high",
        isCompleted: false,
        createdAt: 1762545600000,
    },
    {
        id: "m06",
        title: "Write unit tests for auth service",
        category: "work",
        priority: "medium",
        isCompleted: false,
        createdAt: 1762527600000,
    },
    {
        id: "m07",
        title: "Plan sprint backlog",
        category: "work",
        priority: "medium",
        isCompleted: true,
        createdAt: 1762509600000,
    },
    {
        id: "m08",
        title: "Prepare slides for Monday demo",
        category: "work",
        priority: "high",
        isCompleted: false,
        createdAt: 1762491600000,
    },
    {
        id: "m09",
        title: "Refactor user profile component",
        category: "work",
        priority: "low",
        isCompleted: false,
        createdAt: 1762473600000,
    },
    {
        id: "m10",
        title: "Set up CI pipeline for new repo",
        category: "work",
        priority: "medium",
        isCompleted: true,
        createdAt: 1762455600000,
    },
    {
        id: "m11",
        title: "Send invoice to client",
        category: "work",
        priority: "high",
        isCompleted: true,
        createdAt: 1762437600000,
    },
    {
        id: "m12",
        title: "Update project dependencies",
        category: "work",
        priority: "low",
        isCompleted: false,
        createdAt: 1762419600000,
    },
    {
        id: "m13",
        title: "Write release notes for v2.1",
        category: "work",
        priority: "medium",
        isCompleted: false,
        createdAt: 1762401600000,
    },
    {
        id: "m14",
        title: "Join design review meeting",
        category: "work",
        priority: "low",
        isCompleted: true,
        createdAt: 1762383600000,
    },
    {
        id: "m15",
        title: "Investigate slow dashboard API",
        category: "work",
        priority: "high",
        isCompleted: false,
        createdAt: 1762365600000,
    },
    {
        id: "m16",
        title: "Onboard new team member",
        category: "work",
        priority: "medium",
        isCompleted: false,
        createdAt: 1762347600000,
    },
    {
        id: "m17",
        title: "Clean up old feature branches",
        category: "work",
        priority: "low",
        isCompleted: true,
        createdAt: 1762329600000,
    },
    {
        id: "m18",
        title: "Buy groceries for the week",
        category: "personal",
        priority: "medium",
        isCompleted: false,
        createdAt: 1762311600000,
    },
    {
        id: "m19",
        title: "Book dentist appointment",
        category: "personal",
        priority: "high",
        isCompleted: false,
        createdAt: 1762293600000,
    },
    {
        id: "m20",
        title: "Call mom",
        category: "personal",
        priority: "low",
        isCompleted: true,
        createdAt: 1762275600000,
    },
    {
        id: "m21",
        title: "Clean the apartment",
        category: "personal",
        priority: "low",
        isCompleted: false,
        createdAt: 1762257600000,
    },
    {
        id: "m22",
        title: "Pay electricity bill",
        category: "personal",
        priority: "high",
        isCompleted: true,
        createdAt: 1762239600000,
    },
    {
        id: "m23",
        title: "Renew gym membership",
        category: "personal",
        priority: "medium",
        isCompleted: false,
        createdAt: 1762221600000,
    },
    {
        id: "m24",
        title: "Water the plants",
        category: "personal",
        priority: "low",
        isCompleted: true,
        createdAt: 1762203600000,
    },
    {
        id: "m25",
        title: "Plan weekend trip",
        category: "personal",
        priority: "medium",
        isCompleted: false,
        createdAt: 1762185600000,
    },
    {
        id: "m26",
        title: "Fix the bike tire",
        category: "personal",
        priority: "low",
        isCompleted: false,
        createdAt: 1762167600000,
    },
    {
        id: "m27",
        title: "Buy birthday gift for Anna",
        category: "personal",
        priority: "high",
        isCompleted: false,
        createdAt: 1762149600000,
    },
    {
        id: "m28",
        title: "Do the laundry",
        category: "personal",
        priority: "low",
        isCompleted: true,
        createdAt: 1762131600000,
    },
    {
        id: "m29",
        title: "Go for a 5km run",
        category: "personal",
        priority: "medium",
        isCompleted: true,
        createdAt: 1762113600000,
    },
    {
        id: "m30",
        title: "Organize photo albums",
        category: "personal",
        priority: "low",
        isCompleted: false,
        createdAt: 1762095600000,
    },
    {
        id: "m31",
        title: "Cook dinner for family",
        category: "personal",
        priority: "medium",
        isCompleted: true,
        createdAt: 1762077600000,
    },
    {
        id: "m32",
        title: "Schedule car maintenance",
        category: "personal",
        priority: "medium",
        isCompleted: false,
        createdAt: 1762059600000,
    },
    {
        id: "m33",
        title: "Back up phone data",
        category: "personal",
        priority: "low",
        isCompleted: false,
        createdAt: 1762041600000,
    },
    {
        id: "m34",
        title: "Read Angular signals docs",
        category: "study",
        priority: "high",
        isCompleted: false,
        createdAt: 1762023600000,
    },
    {
        id: "m35",
        title: "Finish RxJS operators course",
        category: "study",
        priority: "medium",
        isCompleted: true,
        createdAt: 1762005600000,
    },
    {
        id: "m36",
        title: "Practice TypeScript generics",
        category: "study",
        priority: "medium",
        isCompleted: false,
        createdAt: 1761987600000,
    },
    {
        id: "m37",
        title: "Review JavaScript array methods",
        category: "study",
        priority: "low",
        isCompleted: false,
        createdAt: 1761969600000,
    },
    {
        id: "m38",
        title: "Learn CSS grid layout",
        category: "study",
        priority: "medium",
        isCompleted: true,
        createdAt: 1761951600000,
    },
    {
        id: "m39",
        title: "Solve 3 LeetCode problems",
        category: "study",
        priority: "high",
        isCompleted: false,
        createdAt: 1761933600000,
    },
    {
        id: "m40",
        title: "Watch talk on web performance",
        category: "study",
        priority: "low",
        isCompleted: true,
        createdAt: 1761915600000,
    },
    {
        id: "m41",
        title: "Read chapter 4 of Clean Code",
        category: "study",
        priority: "medium",
        isCompleted: false,
        createdAt: 1761897600000,
    },
    {
        id: "m42",
        title: "Take notes on Angular routing",
        category: "study",
        priority: "medium",
        isCompleted: false,
        createdAt: 1761879600000,
    },
    {
        id: "m43",
        title: "Practice English listening",
        category: "study",
        priority: "low",
        isCompleted: true,
        createdAt: 1761861600000,
    },
    {
        id: "m44",
        title: "Build a small project with NgRx",
        category: "study",
        priority: "high",
        isCompleted: false,
        createdAt: 1761843600000,
    },
    {
        id: "m45",
        title: "Learn Git rebase workflow",
        category: "study",
        priority: "medium",
        isCompleted: true,
        createdAt: 1761825600000,
    },
    {
        id: "m46",
        title: "Review HTTP caching basics",
        category: "study",
        priority: "low",
        isCompleted: false,
        createdAt: 1761807600000,
    },
    {
        id: "m47",
        title: "Study unit testing with Jasmine",
        category: "study",
        priority: "high",
        isCompleted: false,
        createdAt: 1761789600000,
    },
    {
        id: "m48",
        title: "Read about Web Accessibility (a11y)",
        category: "study",
        priority: "medium",
        isCompleted: false,
        createdAt: 1761771600000,
    },
    {
        id: "m49",
        title: "Practice writing SQL joins",
        category: "study",
        priority: "low",
        isCompleted: true,
        createdAt: 1761753600000,
    },
    {
        id: "m50",
        title: "Prepare for frontend interview",
        category: "study",
        priority: "high",
        isCompleted: false,
        createdAt: 1761735600000,
    },
];

let taskList = [];

//region Task Operations
function getTaskList() {
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
//endregion

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
}
//endregion

function createTaskEl({ id, title, category, priority, isCompleted, createdAt }) {
    const tpl = `
                <button class="checkbox" type="button">
                    <span>O</span>
                </button>
                <div>
                    <h3 id="task-title">${title} | ${isCompleted}</h3>
                    <div class="task-description">
                        <div class="badge">${priority}</div>
                        <div class="badge">${category}</div>
                        <div class="create-at">${createdAt}</div>
                    </div>
                </div>
                <button class="btn-delete" type="button" (click)="deleteTask(id)">
                    <span></span>
                    Delete
                </button>
    `

    const newTaskEl = document.createElement("li");
    newTaskEl.classList.add("task");
    newTaskEl.setAttribute('data-id', id);
    newTaskEl.innerHTML = tpl;
    return newTaskEl;
}

function renderAllTasks() {
    const list = document.querySelector(SELECTORS.TASK_ITEM);
    list.replaceChildren();
    try {
        taskList.forEach(t => {
            list.appendChild(createTaskEl(t));
        })
    } catch (e) {
        console.error("Can\'t render tasks", e);
    }
}

// Form
const formEl = document.querySelector(SELECTORS.FORM);
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(formEl))

    commit(() => createTask(formData));
    formEl.reset();
})

// Event listeners
const taskEl = document.querySelector(SELECTORS.TASK_ITEM);
taskEl.addEventListener('click', function(event) {

    const isDeleteClicked = event.target.closest(SELECTORS.DELETE_BUTTON);
    const isCheckboxClicked = event.target.closest(SELECTORS.CHECK_BOX_BUTTON);

    if (isDeleteClicked) {
        const parentLi = event.target.closest('ul > li');
        const taskId = parentLi.getAttribute('data-id');
        commit(() => deleteTask(taskId));
    }

    if (isCheckboxClicked) {
        const parentLi = event.target.closest('ul > li');
        const taskId = parentLi.getAttribute('data-id');
        commit(() => toggleTask(taskId));
    }
})

// Local Storage
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

// Execution
getTasksFromStorage();
renderAllTasks();