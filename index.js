let addBtn = document.getElementById("addBtn");
let addInput = document.getElementById("addInput");
let list = document.getElementById("list");
let noTask = document.getElementById("noTask");
let clearCompletedBtn = document.getElementById("clearCompletedBtn");
let clearAllBtn = document.getElementById("clearAllBtn");
let allBtn = document.getElementById("allBtn");
let activeBtn = document.getElementById("activeBtn");
let completedBtn = document.getElementById("completedBtn");

function createTask(text) {
  if (text !== "") {
    const newTask = document.createElement("li");
    newTask.setAttribute("class", "active");
    const label = document.createElement("label");
    label.setAttribute("class", "checkField");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "check");
    label.append(input);
    const span = document.createElement("span");
    span.setAttribute("class", "texti");
    span.innerHTML = text;
    const img = document.createElement("img");
    img.setAttribute("src", "img/Trash.png");

    noTask.setAttribute("class", "hiddenP");

    newTask.append(label, span, img);

    list.prepend(newTask);
  }
}

addBtn.addEventListener("click", () => {
  createTask(addInput.value);
  addInput.value = "";
});

list.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
  }
});

clearCompletedBtn.addEventListener("click", () => {
  const completedTasks = document.querySelectorAll(".check:checked");
  completedTasks.forEach((checkbox) => {
    checkbox.closest("li").remove();
  });
});

clearAllBtn.addEventListener("click", () => {
  const allTasks = document.querySelectorAll("li");
  allTasks.forEach((task) => {
    task.remove();
  });
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
