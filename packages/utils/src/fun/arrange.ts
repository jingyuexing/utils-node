export function arrange() {
  const taskList: Function[] = [];

  return {
    execute: async () => {
      for (const task of taskList) {
        await task();
      }
    },
    do: (cb: Function) => {
      // 将任务添加到任务列表
      taskList.push(cb);
      return this; // 返回当前对象以支持链式调用
    },
    wait: (duration: number) => {
      // 添加一个等待指定时间的任务到任务列表
      taskList.push(() => new Promise((resolve) => {
        setTimeout(resolve, duration);
      }));
      return this; // 返回当前对象以支持链式调用
    },
    waitFirst: (duration: number) => {
      // 在任务列表开头添加一个等待指定时间的任务
      taskList.unshift(() => new Promise((resolve) => {
        setTimeout(resolve, duration);
      }));
      return this; // 返回当前对象以支持链式调用
    },
  };
}
