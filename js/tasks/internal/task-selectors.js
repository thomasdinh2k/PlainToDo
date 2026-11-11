import {CATEGORIES} from "../../config/constants.js";

export function filterTasks(masterTaskList, { category, priority, isCompleted } = {}) {
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

export function getStat(masterTaskList) {
    const calculateStatOnPriority = (priority) => {
        // Stats does not count completed items
        return filterTasks(masterTaskList, { priority, isCompleted: false }).length;
    }

    return {
        total: filterTasks(masterTaskList).length,
        active: filterTasks(masterTaskList, { isCompleted: false }).length,
        done: filterTasks(masterTaskList, { isCompleted: true }).length,
        high: calculateStatOnPriority("high"),
    }
}

export function getCategoryCounts(masterTaskList) {
    return {
        all: filterTasks(masterTaskList).length,
        ...Object.fromEntries(
            CATEGORIES.map(c => [
                c,
                filterTasks(masterTaskList, { category: c }).length
            ])
        )
    }
}