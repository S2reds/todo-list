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
  const createHead = () => {
    domTime().headTask()
  }
  const checked = () => {

  }

  return {
    createTask,
    createProject,
    createHead,
    checked
  }
}

export { newTask};
