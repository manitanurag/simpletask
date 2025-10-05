import TaskRepository from "./task.repository.js";

class TaskController {
  constructor() {
    this.repo = new TaskRepository();
  }

  async create(req, res) {
    const data = { ...req.body, createdBy: req.user.id };
    const task = await this.repo.createTask(data);
    res.status(201).json({ message: "Task created", task });
  }

  async list(req, res) {
    const tasks = await this.repo.getAll();
    res.json(tasks);
  }

  async details(req, res) {
    const task = await this.repo.getById(req.params.id);
    res.json(task);
  }

  async edit(req, res) {
    const updated = await this.repo.update(req.params.id, req.body);
    res.json(updated);
  }

  async delete(req, res) {
    await this.repo.delete(req.params.id);
    res.json({ message: "Task deleted" });
  }
}

export default TaskController;
