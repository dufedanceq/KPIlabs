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

