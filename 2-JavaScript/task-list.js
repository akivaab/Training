let todoBtn = document.getElementById("todo-btn")
let completedBtn = document.getElementById("completed-btn")
let todoTaskList = document.getElementById("todo-task-list")
let completedTaskList = document.getElementById("completed-task-list")
let addTaskBtn = document.getElementById("add-task-btn")
let addTaskDescInput = document.getElementById("add-task-desc-input")

let todoTaskDescriptions = localStorage.getItem("todo-task-descriptions") ? JSON.parse(localStorage.getItem("todo-task-descriptions")) : [];
let completedTaskDescriptions = localStorage.getItem("completed-task-descriptions") ? JSON.parse(localStorage.getItem("completed-task-descriptions")) : [];

// initialize todoTaskList
let todoListHTML = ""
for (const todoTaskDesc of todoTaskDescriptions) {
    todoListHTML += `<li class="todo-task">
                        <div class="task-drag">drag</div>
                        <p class="task-desc">${todoTaskDesc}</p>
                        <button class="task-completed-btn">completed</button>
                        <button class="task-delete-btn">delete</button>
                    </li>`
}
todoTaskList.innerHTML = todoListHTML

// initialize completeTaskList
let completedListHTML = ""
for (const completedTaskDesc of completedTaskDescriptions) {
    completedListHTML +=    `<li class="completed-task"></li>
                                <div class="task-drag">drag</div>
                                <p class="task-desc">${completedTaskDesc}</p>
                                <button class="task-delete-btn">delete</button>
                            </li>`
}
completedTaskList.innerHTML = completedListHTML

// add event listeners to buttons
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
addTaskBtn.addEventListener("click", () => {
    let taskDesc = addTaskDescInput.value
    if (taskDesc != "") {
        addTaskDescInput.value = ""
        let newTask = document.createElement("li")
        newTask.classList.add("todo-task")
        newTask.innerHTML = `<div class="task-drag">drag</div>
                            <p class="task-desc">${taskDesc}</p>
                            <button class="task-completed-btn">completed</button>
                            <button class="task-delete-btn">delete</button>`
        todoTaskList.appendChild(newTask)
        addEventListenerToCompletedButton(newTask.querySelector(".task-completed-btn"))
        addEventListenerToDeleteButton(newTask.querySelector(".task-delete-btn"))
    }
})

for (const deleteBtn of document.querySelectorAll(".task-delete-btn")) {
    addEventListenerToDeleteButton(deleteBtn)
}
for (const completedBtn of document.querySelectorAll(".task-completed-btn")) {
    addEventListenerToCompletedButton(completedBtn)
}

function addEventListenerToDeleteButton(deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        deleteBtn.closest("li").remove()
    })
}

function addEventListenerToCompletedButton(completedBtn) {
    completedBtn.addEventListener("click", () => {
        let taskDesc = completedBtn.previousElementSibling.textContent
        completedBtn.closest("li").remove()
        let completedTask = document.createElement("li")
        completedTask.classList.add("completed-task")
        completedTask.innerHTML =  `<div class="task-drag">drag</div>
                                    <p class="task-desc">${taskDesc}</p>
                                    <button class="task-delete-btn">delete</button>`
        completedTaskList.appendChild(completedTask)
        addEventListenerToDeleteButton(completedTask.querySelector(".task-delete-btn"))
    })
}
