import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

export default function Tasks() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks?projectId=${projectId}`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  // Create task
  const createTask = async () => {
    try {
      await API.post("/tasks", {
        ...form,
        projectId,
        status: "todo"
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>

      <h3>Create Task</h3>

      <input
        placeholder="Title"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button onClick={createTask}>Create Task</button>

      <h3>Task List</h3>

      {tasks.map((t) => (
        <div key={t._id}>
          <p>{t.title} - {t.status}</p>

          <button onClick={() => updateStatus(t._id, "in-progress")}>
            In Progress
          </button>

          <button onClick={() => updateStatus(t._id, "done")}>
            Done
          </button>
        </div>
      ))}
    </div>
  );
}