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
  const click = document.createElement('p')
  click.textContent = 'Click to expand'
  click.classList.add('click')
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
  date.textContent = `Due By: ` + obj.date || '';
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
  div.appendChild(click)
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
       console.log(project)
       if (project === 'Todo') continue;
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
  const headTask = () => {
    let project = selectedProject();
    todos = JSON.parse(localStorage.getItem(`${project}`)) || [];
    const form = document.querySelector("#head-form");
    const formData = Object.fromEntries(new FormData(form).entries());
    const task = new Task(
      formData.title,
    );
    todos.push(task);
    localStorage.setItem(`${project}`, JSON.stringify(todos));
    // clears popup
    const background = document.querySelector(".addNewBoxBackground");
    background.style.display = "none";
    // clears form content
    document.querySelector("#head-form").reset();
  }
  return {
    getForm,
    changeTask,
    changeProject,
    createP,
    listTask,
    removeTask,
    listProject,
    headTask
  };
}

function footer() {
    const body = document.querySelector('body')
    const footer = document.createElement("div");
    footer.classList.add("footer");
    const date = new Date().getFullYear();
    footer.innerHTML = `Kyle Park Est. ${date} <a href='https://www.instagram.com/istarry/'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
    </svg></a> <a href='https://www.github.com/S2reds/'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg></a>` ;
    body.appendChild(footer);
}

export { domTime, selectedProject,footer };
