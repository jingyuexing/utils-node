const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

interface Task {
  id:number;
  task:Function
}

class ThreadPool {
  numThreads:number
  taskQueue:Task[] = []
  workers:Worker[] = []
  constructor(numThreads = 1) {
    this.numThreads = numThreads;
    this.workers = [];
  }

  initialize() {
    for (let i = 0; i < this.numThreads; i++) {
      const worker = new Worker(__filename);
      this.workers.push(worker);

      worker.on('message', (result) => {
        const { taskId, data } = result;
        const task = this.taskQueue.find((task) => task.id === taskId);
        task.resolve(data);
      });
    }
  }

  submit(task, ...args) {
    return new Promise((resolve) => {
      const taskId = Date.now();
      const taskData = { id: taskId, task, args };

      const worker = this.workers.pop();
      worker.postMessage(taskData);

      this.taskQueue.push({
        id: taskId,
        resolve,
      });
    });
  }

  close() {
    for (const worker of this.workers) {
      worker.postMessage(null);
    }
  }
}
