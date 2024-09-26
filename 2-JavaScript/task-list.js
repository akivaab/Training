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
    todoBtn.style.display = "none"
    completedBtn.style.display = "block"
})
completedBtn.addEventListener("click", () => {
    completedBtn.style.display = "none"
    todoBtn.style.display = "block"
})
addTaskBtn.addEventListener("click", () => {
    let addTaskDesc = addTaskDescInput.value
    if (addTaskDesc != "") {
        addTaskDescInput.value = ""
        todoTaskList.innerHTML +=   `<li class="todo-task">
                                        <div class="task-drag">drag</div>
                                        <p class="task-desc">${addTaskDesc}</p>
                                        <button class="task-completed-btn">completed</button>
                                        <button class="task-delete-btn">delete</button>
                                    </li>`
    }
})

for (const deleteBtn of document.querySelectorAll(".task-delete-btn")) {
    deleteBtn.addEventListener("click", () => {
        deleteBtn.closest("li").remove()
    })
}
for (const completedBtn of document.querySelectorAll(".task-completed-btn")) {
    completedBtn.addEventListener("click", () => {
        let desc = completedBtn.previousElementSibling.textContent
        completedBtn.closest("li").remove()
        completedTaskList.innerHTML +=  `<li class="completed-task"></li>
                                            <div class="task-drag">drag</div>
                                            <p class="task-desc">${desc}</p>
                                            <button class="task-delete-btn">delete</button>
                                        </li>`
    })
}
