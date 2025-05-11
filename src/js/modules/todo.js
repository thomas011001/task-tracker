function mainTaskFactory(title) {
  return { title, sub: [] };
}

function subTaskFactory(title) {
  return { title, finished: false };
}

export { mainTaskFactory, subTaskFactory };
