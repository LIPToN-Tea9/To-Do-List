let addBtn = document.getElementById("addBtn");
let addInput = document.getElementById("addInput");
let list = document.getElementById("list");
let noTask = document.getElementById("noTask");
let clearCompletedBtn = document.getElementById("clearCompletedBtn");
let clearAllBtn = document.getElementById("clearAllBtn");
let allBtn = document.getElementById("allBtn");
let activeBtn = document.getElementById("activeBtn");
let completedBtn = document.getElementById("completedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleNoTask() {
  noTask.classList.toggle("hiddenP", tasks.length > 0);
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach(task => createTask(task, false));
  toggleNoTask();
}

renderTasks();

function createTask(task, save = true) {
  const { id, text, completed } = task;

  if (text !== "") {

    const newTask = document.createElement("li");
    newTask.dataset.id = id;
    newTask.className = "active"

    const label = document.createElement("label");
    label.className = "checkField";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "check";
    input.checked = completed;

    const span = document.createElement("span");
    span.className = "texti";
    span.innerHTML = text;

    const img = document.createElement("img");
    img.src = "img/Trash.png";

    if (completed) newTask.classList.add("completed");

    label.append(input);
    newTask.append(label, span, img);
    list.append(newTask);

    noTask.classList.add("hiddenP");

    //  виконано
  input.addEventListener("change", () => {
    const taskId = Number(newTask.dataset.id);
    const currentTask = tasks.find(t => t.id === taskId);
    currentTask.completed = input.checked;
    saveTasks();
  });

  //  видалення
  img.addEventListener("click", () => {
    const taskId = Number(newTask.dataset.id);
    tasks = tasks.filter(t => t.id !== taskId);
    newTask.remove();
    saveTasks();
  });

  if (save) {
    tasks.push(task);
    saveTasks();
  }
}}


addBtn.addEventListener("click", () => {
  const text = addInput.value.trim();
  if (!text) return;

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  createTask(newTask);
  addInput.value = "";
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

clearAllBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

allBtn.addEventListener("click", () => {
  const alltasks = document.querySelectorAll("#list li");
  alltasks.forEach((li) => li.classList.remove("hidden"));
});

activeBtn.addEventListener("click", () => {
  const alltasks = document.querySelectorAll("#list li");
  alltasks.forEach((li) => {
    const checkbox = li.querySelector(".check");
    if (checkbox.checked) {
      li.classList.add("hidden");
    } else {
      li.classList.remove("hidden");
    }
  });
});

completedBtn.addEventListener("click", () => {
  const alltasks = document.querySelectorAll("#list li");
  alltasks.forEach((li) => {
    const checkbox = li.querySelector(".check");
    if (checkbox.checked) {
      li.classList.remove("hidden");
    } else {
      li.classList.add("hidden");
    }
  });
});