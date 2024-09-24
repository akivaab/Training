let taskList = document.getElementById("task-list")

function init() {
    let todoTaskList = localStorage.getItem("todo-task-list") ? JSON.parse(localStorage.getItem("todo-task-list")) : [];
    let completedTaskList = localStorage.getItem("completed-task-list") ? JSON.parse(localStorage.getItem("completed-task-list")) : [];

    let todoListHTML = ""
    for (todoTaskDesc of todoTaskList) {
        todoListHTML += `<li class="task">
                            <div class="task-drag">drag</div>
                            <p class="task-desc">${todoTaskDesc}</p>
                            <button class="task-completed-btn">completed</button>
                            <button class="task-delete-btn">delete</button>
                        </li>`
    }
}
