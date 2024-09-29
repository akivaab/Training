const todoBtn = document.getElementById("todo-btn")
const completedBtn = document.getElementById("completed-btn")
const todoTaskList = document.getElementById("todo-task-list")
const completedTaskList = document.getElementById("completed-task-list")
const addTaskBtn = document.getElementById("add-task-btn")
const addTaskDescInput = document.getElementById("add-task-desc-input")

// initialize todoTaskList using local storage
const storedTodoTaskDescriptions = localStorage.getItem("todo-task-descriptions")
const todoTaskDescriptions = storedTodoTaskDescriptions ? JSON.parse(storedTodoTaskDescriptions) : [];
let todoListHTML = ""
for (const todoTaskDesc of todoTaskDescriptions) {
    todoListHTML += `<li class="todo-task">
                        <p class="task-desc">${todoTaskDesc}</p>
                        <button class="task-completed-btn">Completed</button>
                        <button class="task-delete-btn">Delete</button>
                    </li>`
}
todoTaskList.innerHTML = todoListHTML

// initialize completeTaskList using local storage
const storedCompletedTaskDescriptions = localStorage.getItem("completed-task-descriptions")
const completedTaskDescriptions = storedCompletedTaskDescriptions ? JSON.parse(storedCompletedTaskDescriptions) : [];
let completedListHTML = ""
for (const completedTaskDesc of completedTaskDescriptions) {
    completedListHTML +=    `<li class="completed-task">
                                <p class="task-desc">${completedTaskDesc}</p>
                                <button class="task-delete-btn">Delete</button>
                            </li>`
}
completedTaskList.innerHTML = completedListHTML

// setup radio buttons to change between the lists
todoBtn.addEventListener("click", () => {
    completedTaskList.style.display = "none"
    todoTaskList.style.display = "block"
    completedBtn.className = "radio-button-off"
    todoBtn.className = "radio-button-on"
})
completedBtn.addEventListener("click", () => {
    todoTaskList.style.display = "none"
    completedTaskList.style.display = "block"
    todoBtn.className = "radio-button-off"
    completedBtn.className = "radio-button-on"
})

// setup button to add a new task to todoTaskList
addTaskBtn.addEventListener("click", () => {
    let taskDesc = addTaskDescInput.value
    if (taskDesc != "") {
        addTaskDescInput.value = ""
        let newTask = document.createElement("li")
        newTask.classList.add("todo-task")
        newTask.innerHTML = `<p class="task-desc">${taskDesc}</p>
                            <button class="task-completed-btn">Completed</button>
                            <button class="task-delete-btn">Delete</button>`
        todoTaskList.appendChild(newTask)
        addEventListenerToCompletedButton(newTask.querySelector(".task-completed-btn"))
        addEventListenerToDeleteButton(newTask.querySelector(".task-delete-btn"))
        makeTaskDraggable(newTask)
        todoBtn.click()
    }
})

// add event listeners to all delete and completed buttons in both lists
for (const deleteBtn of document.querySelectorAll(".task-delete-btn")) {
    addEventListenerToDeleteButton(deleteBtn)
}
for (const completedBtn of document.querySelectorAll(".task-completed-btn")) {
    addEventListenerToCompletedButton(completedBtn)
}

// make all tasks draggable
for (const task of document.querySelectorAll("li")) {
    makeTaskDraggable(task)
}

// enable delete button to remove task
function addEventListenerToDeleteButton(deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        deleteBtn.closest("li").remove()
    })
}

// enable complete button to move task from todoTaskList to completedTaskList
function addEventListenerToCompletedButton(completedBtn) {
    completedBtn.addEventListener("click", () => {
        let completedTask = completedBtn.closest("li")
        completedTask.classList.remove("todo-task")
        completedTask.classList.add("completed-task")
        completedTask.querySelector(".task-completed-btn").remove()
        completedTaskList.append(completedTask)
    })
}

// setup tasks to be draggable in order to change the order of the lists
let draggedTask = null
function makeTaskDraggable(task) {
    task.draggable = true
    task.addEventListener("dragstart", (event) => {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', null)
        draggedTask = task
    })
    task.addEventListener("dragend", () => {
        draggedTask = null
    })
    task.addEventListener("dragover", (event) => {
        event.preventDefault()
        if (isBefore(task, draggedTask)) {
            task.parentNode.insertBefore(draggedTask, task);
        } 
        else {
            task.parentNode.insertBefore(draggedTask, task.nextSibling);
        }
    })
}

// check if task1 is before task2 in a list
function isBefore(task1, task2) {
    if (task1.parentNode === task2.parentNode) {
        for (let curTask = task2.previousSibling; curTask; curTask = curTask.previousSibling) {
            if (curTask === task1) {
                return true
            }
        }
    }
    return false;
}

// save task lists to local storage before user exits webpage
window.addEventListener("beforeunload", () => {
    let descriptions = Array.from(todoTaskList.querySelectorAll(".task-desc")).map(p => p.textContent)
    localStorage.setItem("todo-task-descriptions", JSON.stringify(descriptions))
    descriptions = Array.from(completedTaskList.querySelectorAll(".task-desc")).map(p => p.textContent)
    localStorage.setItem("completed-task-descriptions", JSON.stringify(descriptions))
})
  