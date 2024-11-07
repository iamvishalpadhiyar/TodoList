const inputbox = document.querySelector("#task");
const addbtn = document.querySelector("#add");
const tasklist = document.querySelector(".tasklist");
let counter = 1;

function addTaskEventListeners(li, taskId) {
    li.querySelector(".checkicon").addEventListener("click", () => {
        const imgIcon = li.querySelector(".checkicon");
        const editButton = li.querySelector("#edit");
        imgIcon.src = "img/checked.png";
        li.classList.add("checked");
        li.querySelector("#checked").style.display = "none";
        editButton.style.display = "none";
        updateTaskStatus(taskId, true);
    });

    li.querySelector("#checked").addEventListener("click", () => {
        const imgIcon = li.querySelector(".checkicon");
        const editButton = li.querySelector("#edit");
        imgIcon.src = 'img/checked.png';
        li.classList.add("checked");
        li.querySelector("#checked").style.display = "none";
        editButton.style.display = "none";

        updateTaskStatus(taskId, true);
    });

    li.querySelector("#edit").addEventListener("click", () => {
        const text = li.querySelector(".text");
        const userInput = prompt("Enter New Value:");
        if (userInput !== null) {
            text.textContent = `${counter - 1}. ${userInput}`;
            updateTaskText(taskId, userInput);
        }
    });

    li.querySelector("#delete").addEventListener("click", () => {
        tasklist.removeChild(li);

        removeTaskFromLocalStorage(taskId);
    });
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `<img src="${task.checked ? 'img/checked.png' : 'img/radio.png'}" alt="img-icon" class="checkicon">
                            <span class="text">${task.text}</span>
                            <button id="checked"><img src="img/checked.png" alt="checked-icon"></button>
                            <button id="edit"><img src="img/pen.png" alt="edit-icon"></button>
                            <button id="delete"><img src="img/delete.png" alt="delete-icon"></button>`;
            
            tasklist.appendChild(li);

            addTaskEventListeners(li, task.id);
        });
    }
}

function updateTaskStatus(taskId, status) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.checked = status;
        saveTasksToLocalStorage(tasks);
    }
}

function updateTaskText(taskId, newText) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.text = newText;
        saveTasksToLocalStorage(tasks);
    }
}

function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasksToLocalStorage(tasks);
}

addbtn.addEventListener("click", () => {
  if (inputbox.value === "") {
    alert("Please enter a task");
    return;
  } else {
    const taskId = counter++;
    const taskText = inputbox.value;

    const newTask = {
        id: taskId,
        text: taskText,
        checked: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);

    const li = document.createElement("li");
    li.innerHTML = `<img src="img/radio.png" alt="img-icon" class="checkicon">
                    <span class="text">${taskId}. ${taskText}</span>
                    <button id="checked"><img src="img/checked.png" alt="checked-icon"></button>
                    <button id="edit"><img src="img/pen.png" alt="edit-icon"></button>
                    <button id="delete"><img src="img/delete.png" alt="delete-icon"></button>`;

    tasklist.appendChild(li);
    inputbox.value = "";

    addTaskEventListeners(li, taskId);
  }
});

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

document.querySelectorAll(".tasklist li").forEach((li) => {
  addTaskEventListeners(li);
});
