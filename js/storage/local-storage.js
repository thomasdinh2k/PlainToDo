import {STORAGE_KEY} from "../config/constants.js";

export function readFromStorage(key) {
    return localStorage.getItem(key)
}

export function writeToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value ?? []));
    } catch (e) {
        console.log("Error while writing to storage", e);
    }
}

export function getTaskListFromStorage() {
    const raw = readFromStorage(STORAGE_KEY.tasks)

    try {
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        throw new Error('Error while getting tasks from storage', { cause: e });
    }
}

export function saveTaskListToStorage(tasks) {
    writeToStorage(STORAGE_KEY.tasks, tasks);
}