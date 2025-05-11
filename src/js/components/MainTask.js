import storage from "../modules/storage";
import SubTask from "./SubTask";
import { subTaskFactory } from "../modules/todo";
import MainTasksPage from "./MainTasksPage";

function MainTask(prop) {
  const task = prop;

  const taskContainer = document.createElement("div");
  taskContainer.className = "main-task";

  taskContainer.innerHTML = `
    <div class="main-task-header">
      <h3>${task.title}</h3>
      <button class="main-delete delete"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg></button>
    </div>
    <div class="add-task">
      <form class="add-form">
        <input type="text" required class="add-title" placeholder="Your Task Name"/>
        <input type="submit" value="+"/>
      </form>
    </div>
    <div class="sub-tasks">
    </div>
  `;

  task.sub.forEach((subTask) => {
    taskContainer
      .querySelector(".sub-tasks")
      .append(SubTask(subTask, task.title));
    taskContainer
      .querySelector(".sub-tasks")
      .append(document.createElement("hr"));
  });

  taskContainer.querySelector(".main-delete").addEventListener("click", () => {
    storage.deleteMain(task.title);
    taskContainer.remove();
    root.innerHTML = "";
    root.appendChild(MainTasksPage(storage.getTasks()));
  });

  taskContainer.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const newSubTask = subTaskFactory(
        taskContainer.querySelector(".add-title").value
      );

      storage.saveSub(newSubTask, task.title);

      taskContainer
        .querySelector(".sub-tasks")
        .append(SubTask(newSubTask, task.title));
      taskContainer
        .querySelector(".sub-tasks")
        .append(document.createElement("hr"));
    } catch {
      console.log("err");
    }
    taskContainer.querySelector(".add-title").value = "";
  });

  return taskContainer;
}

export default MainTask;
