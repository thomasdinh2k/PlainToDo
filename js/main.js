import {
    createTaskStore,
    addTask, deleteTask, toggleTask,
    getStat, getCategoryCounts,
    isTaskValid,
} from "./tasks/index.js";
import {
    getElements, renderIcons,
    createTaskListView, renderStat, renderCategoryCounts,
    getClockText, renderClock, bindClock,
    bindForm,
} from "./ui/index.js";
import {getTaskListFromStorage, saveTaskListToStorage} from "./storage/local-storage.js";
import {mockTaskList} from "../mock/tasks.js";

renderIcons();

const els = getElements();
const taskListView = createTaskListView({
    listEl: els.taskList,
    countEl: els.taskCount,
    emptyStateEl: els.emptyState,
    emptyTitleEl: els.emptyTitle,
})

//region Store subscription
// independent save first, so a UI error can never lose the user's change
const store = createTaskStore([]);
store.subscribe(saveTaskListToStorage);

store.subscribe(newTaskList => {
    taskListView.render(newTaskList);
    renderStat(els.stats, getStat(newTaskList));
    renderCategoryCounts(els.categoryBadges, getCategoryCounts(newTaskList));
});
//endregion

let initialTasks = [];
try {
    initialTasks = getTaskListFromStorage().filter(t => isTaskValid(t));
} catch (e) {
    console.error(e);
}
store.setTasks(initialTasks);

function mockIfEmpty() {
    const taskList = store.getTasks()
    if (taskList.length > 0) return;
    store.setTasks(mockTaskList);
}

taskListView.bindEvent({
    onDelete: (id) => store.setTasks(deleteTask(store.getTasks(), id)),
    onToggle: (id) => store.setTasks(toggleTask(store.getTasks(), id))
});

bindForm(els.addForm, {
    onAddTask: (formData) => store.setTasks(addTask(store.getTasks(), formData)),
})

bindClock(els.clock, { onClick: mockIfEmpty });

renderClock(els.clock, getClockText());
setInterval(() => renderClock(els.clock, getClockText()), 1000);