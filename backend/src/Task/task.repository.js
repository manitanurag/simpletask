import Task from "./task.schema.js";

class TaskRepository {
  async createTask(obj) {
    return await Task.create(obj);
  }

  async getAll() {
    return await Task.find().populate("assignedTo createdBy");
  }

  async getById(id) {
    return await Task.findById(id);
  }

  async update(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Task.findByIdAndDelete(id);
  }
}

export default TaskRepository;
