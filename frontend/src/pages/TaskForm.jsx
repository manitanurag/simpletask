import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, fetchTask, updateTask } from "../api";

const priorities = ["high", "medium", "low"];

export default function TaskForm({ editMode }) {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (editMode && id) {
      setLoading(true);
      fetchTask(id)
        .then((res) => setForm(res.data))
        .finally(() => setLoading(false));
    }
  }, [editMode, id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await updateTask(id, form);
      } else {
        await createTask(form);
      }
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{editMode ? "Edit Task" : "Create Task"}</h2>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="dueDate"
        type="date"
        value={form.dueDate?.slice(0, 10) || ""}
        onChange={handleChange}
        required
      />
      <select name="priority" value={form.priority} onChange={handleChange}>
        {priorities.map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading}>
        {editMode ? "Update" : "Create"} Task
      </button>
    </form>
  );
}