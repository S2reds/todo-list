import { domTime } from "./dom.js";




function newTask() {
  const createTask = () => {
    // grab data from form
    const domCreate = domTime();
    domCreate.getForm();
  };
  const createProject = () => {
    const domCreate = domTime();
    domCreate.createP();
  };

  return {
    createTask,
    createProject
  }
}

function listItems() {
    const listTasks = () => {
        
    }
}

export { newTask, listItems };
