const storage = (() => {
  const defaultTasks = [
    {
      title: "Task",
      sub: [
        { title: "Sub Task", finished: false },
        { title: "Another Sub Task", finished: false },
      ],
    },
  ];
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify(defaultTasks));
  }

  const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

  const saveMain = (task) => {
    const tasks = getTasks();
    if (tasks.some((t) => t.title == task.title))
      throw new Error("This task already exists");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getMain = (taskTitle) => {
    const tasks = getTasks();
    const task = tasks.find((item) => item.title == taskTitle);
    return task;
  };

  const deleteMain = (taskTitle) => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter((task) => task.title != taskTitle);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const saveSub = (sub, mainTaskTitle) => {
    const tasks = getTasks();
    const task = tasks.find((task) => task.title == mainTaskTitle);

    if (task.sub.some((task) => task.title == sub.title)) {
      throw new Error("This task already exists");
    }

    task.sub.push(sub);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const deleteSub = (mainTaskTitle, subTaskTitle) => {
    const tasks = getTasks();
    const task = tasks.find((task) => task.title == mainTaskTitle);

    if (!task) return;

    task.sub = task.sub.filter((task) => task.title != subTaskTitle);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const finishSub = (mainTaskTitle, subTaskTitle) => {
    const tasks = getTasks();
    const task = tasks.find((task) => task.title == mainTaskTitle);

    if (!task) return;

    const subTask = task.sub.find((task) => task.title == subTaskTitle);

    if (!subTask) return;

    subTask.finished = !subTask.finished;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return {
    getTasks,

    getMain,
    saveMain,
    deleteMain,

    saveSub,
    deleteSub,
    finishSub,
  };
})();

export default storage;
