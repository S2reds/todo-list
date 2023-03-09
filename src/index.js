import "./style.css";
import { newTask } from "./todo.js";
import { domTime, selectedProject } from "./dom.js";

console.log("test");
domTime().listProject();
domTime().listTask();

window.addEventListener("load", () => {
  const todolist = JSON.parse(localStorage.getItem("todo")) || [];
});

// bottom right add button
const addNew = document.querySelector("#addButton");
addNew.addEventListener("click", () => {
  const popup = document.querySelector(".addNewBoxBackground");
  popup.style.display = "flex";
  // cancels popup if esc pressed
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      popup.style.display = "none";
      document.querySelector("#newTypeForm").reset();
    }
  });
});

// logic to find form
function getStyle(id, name) {
  var element = document.getElementById(id);
  return element.currentStyle
    ? element.currentStyle[name]
    : window.getComputedStyle
    ? window.getComputedStyle(element, null).getPropertyValue(name)
    : null;
}

// popup window add eventlistener
const popupNew = document.querySelectorAll("#newButton");
popupNew.forEach((popup) => {
  popup.addEventListener("click", () => {
    event.preventDefault();
    if (getStyle("newTypeForm", "display") === "flex") {
      const createTask = newTask();
      createTask.createTask();
      domTime().listTask();
      pullout();
      deleter();
      switcher();
    } else if (getStyle("newTypeForm", "display") === "none") {
      const createProj = newTask();
      createProj.createProject();
      domTime().listProject();
      pullout();
      deleter();
      switcher();
    }
  });
});

// popup window switcher
const popuptypes = document.querySelectorAll(".popupSelector");
popuptypes.forEach((type) => {
  type.addEventListener("click", (e) => {
    if (type.id === "popupProject") {
      const dom = domTime();
      dom.changeProject();
    } else {
      const dom = domTime();
      dom.changeTask();
    }
  });
});

// project switcher
export function switcher() {
  const projects = document.querySelectorAll(".projects");
  const projectTab = document.querySelector("#projectList");
  projects.forEach((x) => {
    x.addEventListener("click", (e) => {
      for (let child of projectTab.children) {
        if (child.classList.contains("selected")) {
          child.classList.remove("selected");
          x.classList.add("selected");
          domTime().listTask();
          pullout();
        }
      }
    });
  });
}
switcher();

// task deleter
export function deleter() {
  const deleted = document.querySelectorAll(".taskRemove");
  deleted.forEach((button) => {
    button.addEventListener("click", (e) => {
      const selected = selectedProject();
      const tasks = JSON.parse(localStorage.getItem(`${selected}`));
      const clicked = e.target;
      const parent = clicked.closest("div");
      const value = parent.dataset.task;
      for (let task in tasks) {
        if (value === tasks[task].title) {
          domTime().removeTask(task);
        }
      }
    });
  });
}
deleter();

// pullout switch
export function pullout() {
  const tasks = document.querySelectorAll(".newItem");
  tasks.forEach((task) => {
    task.addEventListener("click", (e) => {
      const clicked = e.target;
      const parent = clicked.closest("div");
      if (task.classList.contains('pullout')) {
          task.classList.remove("pullout");
          parent.childNodes[3].style.display = 'none'
        } else {
            task.classList.add('pullout')
            parent.childNodes[3].style.display = 'block'
      }
    });
  });
}

pullout();
