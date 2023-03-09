import {deleter} from './index.js';
function Task(title, desc, date, prior) {
  (this.title = title),
    (this.desc = desc),
    (this.date = date),
    (this.prior = prior);
}

let todos = JSON.parse(localStorage.getItem("todo")) || [];

function displayTask(obj) {
  const content = document.querySelector(".taskContent");
  const div = document.createElement("div");
  const check = document.createElement("div");
  const p = document.createElement("p");
  const button = document.createElement("button");
  const details = document.createElement("button");
  const pullout = document.createElement('div')
  pullout.textContent = `Description: ${obj.desc}`
  pullout.classList.add('desc')
  const date = document.createElement("p");
  details.textContent = "Priority";
  details.classList.add("details");
  if (obj.prior === 'low') details.style.backgroundColor = 'green'
  else if (obj.prior === 'med') {
      details.style.backgroundColor = 'yellow'
      details.style.color = 'black'
  } 
  else details.style.backgroundColor = 'crimson'
  date.textContent = `${obj.date}`;
  date.classList.add("taskDate");
  button.classList.add("taskRemove");
  div.dataset.task = `${obj.title}`;
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
    />
  </svg>`;
  check.classList.add("check");
  div.classList.add("newItem");
  p.textContent = `${obj.title}`;
  div.appendChild(check);
  div.appendChild(p);
  div.appendChild(date);
  div.appendChild(pullout)
  div.appendChild(details);
  div.appendChild(button);
  content.appendChild(div);
}

function selectedProject() {
  const selected = document.querySelector("#projectList");
  for (let i of selected.children) {
    if (i.classList.contains("selected")) {
      return i.innerText;
    }
  }
}

function domTime() {
  const getForm = () => {
    let project = selectedProject();
    todos = JSON.parse(localStorage.getItem(`${project}`)) || [];
    const form = document.querySelector("#newTypeForm");
    const formData = Object.fromEntries(new FormData(form).entries());
    const task = new Task(
      formData.title,
      formData.desc,
      formData.date,
      formData.priority
    );
    todos.push(task);
    localStorage.setItem(`${project}`, JSON.stringify(todos));
    // clears popup
    const background = document.querySelector(".addNewBoxBackground");
    background.style.display = "none";
    // clears form content
    document.querySelector("#newTypeForm").reset();
  };
  const changeProject = () => {
    const type = document.querySelector("#newTypeForm");
    const project = document.querySelector("#newProjectForm");
    type.style.display = "none";
    project.style.display = "flex";
    const typeSelect = document.querySelector("#popupTask");
    const projectSelect = document.querySelector("#popupProject");
    typeSelect.classList.remove("miniSelected");
    projectSelect.classList.add("miniSelected");
  };
  const changeTask = () => {
    const type = document.querySelector("#newTypeForm");
    const project = document.querySelector("#newProjectForm");
    type.style.display = "flex";
    project.style.display = "none";
    const typeSelect = document.querySelector("#popupTask");
    const projectSelect = document.querySelector("#popupProject");
    typeSelect.classList.add("miniSelected");
    projectSelect.classList.remove("miniSelected");
  };
  const createP = () => {
    const newProj = document.querySelector("#newProjectForm");
    const formData = Object.fromEntries(new FormData(newProj).entries());
    console.log(formData)
    const arr = [];
    if (localStorage.getItem(`${formData.projectTitle}`) === null) {
      localStorage.setItem(`${formData.projectTitle}`, JSON.stringify(arr));
      const background = document.querySelector(".addNewBoxBackground");
      background.style.display = "none";
    } else console.log("Already used!");
    document.querySelector('#newProjectForm').reset();
    
  };
  const listTask = () => {
    let todos = [];
    const container = document.querySelector(".taskContent");
    const selected = document.querySelector("#projectList");
    container.innerHTML = "";
    for (let i of selected.children) {
      if (i.classList.contains("selected")) {
        todos =
          JSON.parse(localStorage.getItem(`${i.outerText}`)) ||
          [];
      }
    }
    for (let task in todos) {
      displayTask(todos[task]);
    }
  };
  const listProject = () => {
    const projectlist = document.querySelector('#projectList')
    const projects = {...localStorage}
    const sorted = Object.keys(projects).sort()
    projectlist.innerHTML = '';
    const li = document.createElement('li')
    li.classList.add('selected')
    li.classList.add('projects')
    li.textContent = 'Todo'
    projectlist.appendChild(li)
    for (let project of sorted) {
       const li = document.createElement('li')
       li.textContent = `${project}`
       li.classList.add('projects')
       if (project === 'todo') continue;
       else projectlist.appendChild(li)
    }
    
  };
  const removeTask = (num) => {
    const project = JSON.parse(localStorage.getItem(`${selectedProject()}`));
    project.splice(num, 1);
    localStorage.setItem(`${selectedProject()}`, JSON.stringify(project));
    domTime().listTask();
    deleter();
  };
  return {
    getForm,
    changeTask,
    changeProject,
    createP,
    listTask,
    removeTask,
    listProject
  };
}

export { domTime, selectedProject };
