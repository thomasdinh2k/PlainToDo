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
