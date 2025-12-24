import { useEffect, useState } from "react";
import API from "../api";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>User Dashboard</h2>

      {tasks.map((task) => (
        <div key={task._id} style={{ marginBottom: 10 }}>
          <b>{task.title}</b> - {task.status}

          <select
            onChange={(e) => updateStatus(task._id, e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
}
