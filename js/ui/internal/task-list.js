import {capitalize} from "../../utils/string.js";
import {formatFullDateTime} from "../../utils/date-format.js";
import {renderIcons} from "./icons.js";

export function createTaskListView({ listEl, countEl, emptyStateEl, emptyTitleEl }) {
    const taskTemplate = document.getElementById('task-template');

    function renderEmptyState(isEmpty, category) {
        listEl.hidden = isEmpty;
        emptyStateEl.hidden = !isEmpty;
        if (!isEmpty) return;

        emptyTitleEl.textContent = category === 'all'
            ? 'No tasks yet'
            : `No ${capitalize(category)} tasks`;
    }

    function bindEvent({ onDelete, onToggle }) {
        listEl.addEventListener('click', (event) => {
            const taskEl = event.target.closest("[data-id]")
            if(!taskEl) return;
            const id = taskEl.dataset.id;
            const isDelete = !!event.target.closest(".btn-delete");
            const isToggle = !!event.target.closest(".checkbox");

            isDelete && onDelete(id);
            isToggle && onToggle(id);
        })
    }

    function render(taskList, { category = 'all' } = {}) {
        const fragment = document.createDocumentFragment();
        // TODO: Implement filter by categories
        // Sort the task by creation date, then render
        taskList
            .toSorted((a, b) => - a.createdAt + b.createdAt)
            .forEach(t => fragment.append(renderTask(taskTemplate, t)));

        listEl.replaceChildren(fragment);
        renderIcons(listEl);

        countEl.textContent = `${taskList.length} ${taskList.length === 1 ? 'task' : 'tasks'}`;
        renderEmptyState(taskList.length === 0, category);
    }

    return {
        render,
        bindEvent
    }
}

function renderTask(template, { id, title, category, priority, isCompleted, createdAt }) {
    const li = template.content.firstElementChild.cloneNode(true);
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
    const deleteButton = li.querySelector('.btn-delete')
    deleteButton.setAttribute('aria-label', `Delete “${title}”`);

    return li;
}
