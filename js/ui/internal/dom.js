export function getElements() {
    const badge = (category) => query(`[data-category="${category}"] .badge`);

    return {
        // Sidebar
        categoryList: query('[data-el="category-list"]'),
        categoryBadges: {
            all:      badge('all'),
            work:     badge('work'),
            personal: badge('personal'),
            study:    badge('study'),
        },

        // Header
        clock: {
            root: query('[data-el="clock"]'),
            day:  query('[data-el="day"]'),
            date: query('[data-el="date"]'),
            time: query('[data-el="time"]'),
        },

        // Stat cards
        stats: {
            total:  query('[data-stat="total"]'),
            active: query('[data-stat="active"]'),
            done:   query('[data-stat="done"]'),
            high:   query('[data-stat="high"]'),
        },

        // Add form
        addForm: query('[data-el="add-form"]'),

        // Task list
        taskList:  query('[data-el="task-list"]'),
        taskCount: query('[data-el="task-count"]'),
        emptyState: query('[data-el="empty-state"]'),
        emptyTitle: query('[data-el="empty-title"]'),
    };
}

function query(selector) {
    const el = document.querySelector(selector);
    if (!el) console.warn(`getElements: no element matches "${selector}"`);
    return el;
}

// setText fn with cache value: skips the DOM write when the text hasn't changed
const lastText = new WeakMap();

export function setText(el, value) {
    if (lastText.get(el) === value) return;
    lastText.set(el, value);
    el.textContent = value;
}
