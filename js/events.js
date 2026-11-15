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
