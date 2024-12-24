const EventEmitter = require("events");

class Task {
  constructor(id, processTime, eventEmitter) {
    this.id = id;
    this.processTime = processTime;
    this.status = "idle";
    this.eventEmitter = eventEmitter;

    this.eventEmitter.on("startTask", (taskId) => {
      if (taskId === this.id) {
        this.start();
      }
    });

    this.eventEmitter.on("abortAll", () => {
      this.abort();
    });
  }

  async start() {
    if (this.status !== "idle") return;

    this.status = "running";
    this.eventEmitter.emit("taskStatus", { id: this.id, status: "running" });

    try {
      await new Promise((resolve) => setTimeout(resolve, this.processTime));

      if (this.status === "aborted") {
        return;
      }

      this.status = "completed";
      this.eventEmitter.emit("taskStatus", {
        id: this.id,
        status: "completed",
      });
    } catch (error) {
      this.status = "failed";
      this.eventEmitter.emit("taskStatus", {
        id: this.id,
        status: "failed",
        error,
      });
    }
  }

  abort() {
    if (this.status === "running") {
      this.status = "aborted";
      this.eventEmitter.emit("taskStatus", { id: this.id, status: "aborted" });
    }
  }
}
//demo
(async () => {
  const eventEmitter = new EventEmitter();

  const tasks = [
    new Task(1, 1000, eventEmitter),
    new Task(2, 2000, eventEmitter),
    new Task(3, 1500, eventEmitter),
  ];

  eventEmitter.on("taskStatus", ({ id, status, error }) => {
    if (status === "completed") {
      console.log(`Task ${id} completed.`);
    } else if (status === "aborted") {
      console.log(`Task ${id} aborted.`);
    } else if (status === "failed") {
      console.log(`Task ${id} failed: ${error?.message}`);
    } else {
      console.log(`Task ${id} is ${status}.`);
    }
  });

  console.log("Starting tasks...");
  eventEmitter.emit("startTask", 1);
  eventEmitter.emit("startTask", 2);
  eventEmitter.emit("startTask", 3);

  setTimeout(() => {
    console.log("Aborting all tasks...");
    eventEmitter.emit("abortAll");
  }, 1500);
})();
