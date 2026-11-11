export const STORAGE_KEY = { tasks: "plaintodo.tasks" }

export const CATEGORIES = Object.freeze(['work', 'personal', 'study']);
export const PRIORITIES = Object.freeze(['low', 'medium', 'high']);

// {
//         id: "m01",
//         title: "Prepare quarterly report",
//         category: "work",
//         priority: "high",
//         isCompleted: false,
//         createdAt: 1762617600000,
//     }
export const TASK_KEYS = Object.freeze(['id', 'title', 'category', 'priority', 'isCompleted', 'createdAt'])