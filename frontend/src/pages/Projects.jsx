import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const navigate = useNavigate();

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const createProject = async () => {
    try {
      await API.post("/projects", {
        ...form
      });
      fetchProjects();
    } catch (err) {
      alert("Only admin can create project");
    }
  };

  return (
    <div>
      <h2>Projects</h2>

      <input
        placeholder="Project name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button onClick={createProject}>Create Project</button>

      <h3>Project List</h3>

      {projects.map((p) => (
        <div key={p._id}>
          <p><b>{p.name}</b></p>

          <button onClick={() => navigate(`/tasks/${p._id}`)}>
            Open Tasks
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}