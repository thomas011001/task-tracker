import storage from "../js/modules/storage";

beforeEach(() => localStorage.setItem("tasks", "[]"));

describe("main task", () => {
  test("saveing", () => {
    const task = { title: "study math", sub: [] };
    storage.saveMain(task);
    console.log(storage.getMain("study math"));
    expect(storage.getMain("study math")).toEqual(task);
  });

  test("deleting", () => {
    const tasks = [
      {
        title: "study math",
        sub: [
          { title: "chapter one", finished: true },
          { title: "chapter two", finished: false },
        ],
      },
      {
        title: "study english",
        sub: [{ title: "chapter one", finished: true }],
      },
    ];

    tasks.forEach((task) => storage.saveMain(task));

    storage.deleteMain("study math");

    expect(storage.getTasks()).toEqual([
      {
        title: "study english",
        sub: [{ title: "chapter one", finished: true }],
      },
    ]);
  });
});

describe("sub task", () => {
  test("save", () => {
    const mainTask = { title: "main", sub: [] };
    const subTasks = [
      { title: "sub1", finished: false },
      { title: "sub2", finished: true },
    ];

    storage.saveMain(mainTask);
    subTasks.forEach((task) => storage.saveSub(task, "main"));

    expect(storage.getMain("main").sub).toEqual(subTasks);
  });

  test("deleting", () => {
    const mainTask = { title: "main", sub: [] };
    const subTasks = [
      { title: "sub1", finished: false },
      { title: "sub2", finished: true },
    ];

    storage.saveMain(mainTask);
    subTasks.forEach((task) => storage.saveSub(task, "main"));
    storage.deleteSub("main", "sub2");

    expect(storage.getMain("main").sub).toEqual([
      { title: "sub1", finished: false },
    ]);
  });

  test("finish/unfinish", () => {
    const mainTask = { title: "main", sub: [] };
    const subTasks = [
      { title: "sub1", finished: false },
      { title: "sub2", finished: true },
    ];

    storage.saveMain(mainTask);
    subTasks.forEach((task) => storage.saveSub(task, "main"));
    storage.finishSub("main", "sub1");
    storage.finishSub("main", "sub2");

    expect(storage.getMain("main").sub).toEqual([
      { title: "sub1", finished: true },
      { title: "sub2", finished: false },
    ]);

    storage.finishSub("main", "sub1");
    storage.finishSub("main", "sub2");

    expect(storage.getMain("main").sub).toEqual([
      { title: "sub1", finished: false },
      { title: "sub2", finished: true },
    ]);
  });
});
