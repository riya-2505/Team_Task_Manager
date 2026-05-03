import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    done: 0,
    pending: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/tasks");
      const tasks = res.data;

      const done = tasks.filter(t => t.status === "done").length;

      setStats({
        total: tasks.length,
        done,
        pending: tasks.length - done
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total Tasks: {stats.total}</p>
      <p>Completed: {stats.done}</p>
      <p>Pending: {stats.pending}</p>

      <hr />

      <h3>Navigation</h3>

      <button onClick={() => navigate("/projects")}>
        Go to Projects
      </button>

      <button onClick={() => navigate("/tasks/")}>
        Go to Tasks
      </button>
    </div>
  );
}