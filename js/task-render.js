function createTaskEl({ id, title, category, priority, isCompleted, createdAt }) {
    function upperCaseFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function covertDateTime(createAt) {
        return new Date(createAt).toLocaleString("en-US",
            {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
    }

    const tpl = `
                <button class="checkbox" type="button">
                    <span class="icon">
                        ${isCompleted ? ICONS["circleCheck"] : ICONS["circle"]}
                    </span>
                </button>
                <div>
                    <h3 id="task-title">${title}</h3>
                    <div class="task-description">
                        <div class="badge priority-${priority}">${upperCaseFirstLetter(priority)}</div>
                        <div class="badge cat-${category}">${upperCaseFirstLetter(category)}</div>
                        <div class="create-at">Added ${covertDateTime(createdAt)}</div>
                    </div>
                </div>
                <button class="btn-delete" type="button">
                    <span class="icon">
                        ${ICONS["trash"]}
                    </span> 
                    Delete
                </button>
    `

    const newTaskEl = document.createElement("li");
    newTaskEl.classList.add("task");

    if (isCompleted) {
        newTaskEl.classList.add("completed");
    } else {
        newTaskEl.classList.remove("completed");
    }

    newTaskEl.setAttribute('data-id', id);
    newTaskEl.innerHTML = tpl;
    return newTaskEl;
}

function renderAllTasks() {
    triggerNoTaskState(taskList.length === 0);
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

function triggerNoTaskState(isNoTask) {
    const el = document.querySelector('.empty-state');

    if (isNoTask) {
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}
