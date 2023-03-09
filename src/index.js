import "./style.css";
import { newTask } from "./todo.js";
import { domTime, selectedProject, footer } from "./dom.js";
import "./style.scss";

console.log("test");
domTime().listProject();
domTime().listTask();
footer();

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
      checkbox();
    } else if (getStyle("newTypeForm", "display") === "none") {
      const createProj = newTask();
      createProj.createProject();
      domTime().listProject();
      pullout();
      deleter();
      switcher();
      checkbox();
    }
  });
});

// header Add Task
const headertask = document.querySelector("#head-submit");
headertask.addEventListener("click", (e) => {
  event.preventDefault();
  newTask().createHead();
  domTime().listTask();
  pullout();
  deleter();
  switcher();
  checkbox();
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
          checkbox();
          deleter();
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
      event.stopPropagation();
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
      pullout();
      checkbox();
      deleter();
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
      if (task.classList.contains("pullout")) {
        task.classList.remove("pullout");
        parent.childNodes[3].style.display = "none";
      } else {
        task.classList.add("pullout");
        parent.childNodes[3].style.display = "block";
      }
    });
  });
}
pullout();

// checkbox listener
function checkbox() {
  const check = document.querySelectorAll(".check");
  check.forEach((x) => {
    x.addEventListener("click", (e) => {
      event.stopPropagation();
      const parent = e.target.closest("div");
      console.log(parent);
      const checkedtxt = parent.parentNode.childNodes[1].style.textDecoration;
      if (checkedtxt === "line-through") {
        parent.parentNode.childNodes[1].style.textDecoration = "none";
        x.innerHTML = "";
      } else {
        parent.parentNode.childNodes[1].style.textDecoration = "line-through";
        x.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
      }
    });
  });
}
checkbox();
