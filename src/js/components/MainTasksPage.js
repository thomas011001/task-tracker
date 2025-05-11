import storage from "../modules/storage";
import { mainTaskFactory } from "../modules/todo";
import MainTaskButton from "./MainTaskButton";

function MainTasksPage(prop) {
  const tasks = prop;

  const pageContainer = document.createElement("div");
  pageContainer.className = "main-tasks-page";

  pageContainer.innerHTML = `
  <form class="add-form">
    <input type="text" required class="add-title" placeholder="Your Task Name"/>
    <input type="submit" value="+"/> 
  </form>
  <div class="main-tasks-btns">

  </div>
  `;

  tasks.forEach((task) => {
    const taskBtn = MainTaskButton(task);
    pageContainer.querySelector(".main-tasks-btns").append(taskBtn);
    pageContainer
      .querySelector(".main-tasks-btns")
      .append(document.createElement("hr"));
  });

  pageContainer.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const title = pageContainer.querySelector(".add-title").value;
      const task = mainTaskFactory(title);

      storage.saveMain(task);

      const taskBtn = MainTaskButton(task);
      pageContainer.querySelector(".main-tasks-btns").append(taskBtn);
      pageContainer
        .querySelector(".main-tasks-btns")
        .append(document.createElement("hr"));
    } catch {
      console.log("err");
    }
    pageContainer.querySelector(".add-title").value = "";
  });

  return pageContainer;
}

export default MainTasksPage;
