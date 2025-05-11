import MainTasksPage from "./components/MainTasksPage";
import storage from "./modules/storage";

import "../scss/style.scss";
import "../scss/mainPage.scss";
import "../scss/secPage.scss";

const root = document.getElementById("root");

root.appendChild(MainTasksPage(storage.getTasks()));

document.getElementById("mainTaskBtns").addEventListener("click", () => {
  root.innerHTML = "";
  root.appendChild(MainTasksPage(storage.getTasks()));
});
