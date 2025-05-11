import MainTask from "./MainTask";

function MainTaskButton(prop) {
  const task = prop;
  const root = document.getElementById("root");

  const btnContainer = document.createElement("button");
  btnContainer.className = "main-task-btn";

  btnContainer.textContent = task.title;

  btnContainer.addEventListener("click", () => {
    root.innerHTML = "";
    root.append(MainTask(task));
  });

  return btnContainer;
}

export default MainTaskButton;
