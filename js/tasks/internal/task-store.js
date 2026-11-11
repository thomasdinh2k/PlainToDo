export function createTaskStore(initialTasks = []) {
    let taskList = initialTasks;

    // Observer pattern
    const listeners = new Set(); // avoid dup listeners

    return {
        getTasks(){
            return taskList;
        },
        setTasks(newList){
            taskList = newList;
            // Tell everyone
            listeners.forEach(l => l(taskList))
        },
        subscribe(listenerFn){
            listeners.add(listenerFn);
        },
    }
}