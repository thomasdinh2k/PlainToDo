import {CATEGORIES, PRIORITIES, TASK_KEYS} from "../../config/constants.js";

// Filter invalid task list to prevent error if user modify directly from localStorage
export function isTaskValid(t) {
    // Case 1: Check valid shape
    if (t === null || typeof t !== 'object') return false

    // Case 2: Have all valid keys
    if (!TASK_KEYS.every(k => Object.hasOwn(t, k))) return false

    // Case 3: Valid categories & priorities
    return CATEGORIES.includes(t.category) && PRIORITIES.includes(t.priority);
}

export function isNewTaskValid({title, category, priority}) {
    if (
        typeof title !== 'string' ||
        title.trim() === ''
    ) {
        console.error('Task title can\'t be empty');
        return false;
    }

    if (!CATEGORIES.includes(category) || !PRIORITIES.includes(priority)) {
        console.error('Invalid category or priority')
        return false;
    }

    return true;
}