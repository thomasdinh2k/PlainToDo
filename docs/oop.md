# Question
Why move this code into classes at all? What does it fix that your current functions don’t? Answer in 1–2 lines.
> It helps organize the code, which promotes encapsulation so that I could implement it easier (like core logic side 
> can 
> just use "API" to work with UI), moreover, it helps with inheritance so that I don't have to write duplicated code

# Sketch
- The classes, with one line on the job of each
- What data each class keeps
- Its methods: names, and what each one returns
- Which class creates or calls which

class Storage (to store methods on interacting with localStorageAPI)
    methods
        writeToStorage()
        readFromStorage()
        getTaskListFromStorage()
        

class Tasks (the main class of the project, which holds methods included to interacting with tasks)
    properties
        private _initialTaskList
        private masterTaskList
    methods
        addTask()
        filterTask(criteria)
        toggleTask(id)
        deleteTask(id)
        resetTaskList()
        saveTaskList()
        getStat()

class 

class UI (hold methods to update UI)
    methods
        updateUI()
                



## Unsolved questions
1. If I break Storage and TaskFactory, then how can task from TaskFactory can be retrieved from Storage?
2. Can/Should I separate the filtering and stats from TaskFactory?