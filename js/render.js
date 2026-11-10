import {renderIcons} from "./icons.js";
import {capitalize, formatFullDateTime} from "./helpers.js";

// Render task + state
export function render(taskList, { category = 'all' } = {}) {
    const fragment = document.createDocumentFragment();
    // TODO: Implement filter by categories
    // Sort the task by creation date, then render
    taskList
        .toSorted((a, b) => - a.createdAt + b.createdAt)
        .forEach(t => fragment.append(renderTask(t)));

    els.taskList.replaceChildren(fragment);
    renderIcons(els.taskList);

    els.taskCount.textContent = `${taskList.length} ${taskList.length === 1 ? 'task' : 'tasks'}`;
    renderEmptyState(taskList.length === 0, category);
}

function renderEmptyState(isEmpty, category) {
    els.taskList.hidden = isEmpty;
    els.emptyState.hidden = !isEmpty;
    if (!isEmpty) return;

    els.emptyTitle.textContent = category === 'all'
        ? 'No tasks yet'
        : `No ${capitalize(category)} tasks`;
}



const els = getElements();


function query(selector) {
    const el = document.querySelector(selector);
    if (!el) console.warn(`getElements: no element matches "${selector}"`);
    return el;
}

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

        // Task list
        taskList:  query('[data-el="task-list"]'),
        taskCount: query('[data-el="task-count"]'),
        emptyState: query('[data-el="empty-state"]'),
        emptyTitle: query('[data-el="empty-title"]'),
    };
}

const taskTemplate = document.getElementById('task-template');

export function renderTask({ id, title, category, priority, isCompleted, createdAt }) {
    const li = taskTemplate.content.firstElementChild.cloneNode(true);
    li.classList.add(`cat-${category}`);
    li.classList.toggle('done', isCompleted);
    li.dataset.id = id;

    // Checkbox
    const checkbox = li.querySelector('.checkbox');

    checkbox.setAttribute('aria-pressed', String(isCompleted));
    checkbox.setAttribute('aria-label', `Done: “${title}”`);
    checkbox.querySelector('[data-icon]').dataset.icon = isCompleted ? 'circleCheck' : 'circle';

    // Title
    li.querySelector('.title').textContent = title;

    // Badges
    const priorityBadge = li.querySelector("[data-slot='priority']");
    priorityBadge.classList.add(`priority-${priority}`);
    priorityBadge.textContent = capitalize(priority);

    const categoryBadge = li.querySelector("[data-slot='category']");
    categoryBadge.classList.add(`cat-${category}`);
    categoryBadge.textContent = capitalize(category);

    // Dates
    const time = li.querySelector('time');
    time.dateTime = new Date(createdAt).toISOString();
    time.textContent = formatFullDateTime(createdAt);

    // Delete
    const deleteButton =li.querySelector('.btn-delete')
    deleteButton.setAttribute('aria-label', `Delete “${title}”`);

    return li;
}

export function bindEvent({ onDelete, onToggle }) {
    els.taskList.addEventListener('click', (event) => {
        const taskEl = event.target.closest("[data-id]")
        if(!taskEl) return;
        const id = taskEl.dataset.id;
        const isDelete = !!event.target.closest(".btn-delete");
        const isToggle = !!event.target.closest(".checkbox");

        isDelete && onDelete(id);
        isToggle && onToggle(id);
    })
}

export function renderClock({ day, date, time }) {
    els.clock.time.textContent = time;
    els.clock.day.textContent = day;
    els.clock.date.textContent = date;
}