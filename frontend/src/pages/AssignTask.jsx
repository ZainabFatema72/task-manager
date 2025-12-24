import { useEffect, useState } from "react";
import API from "../api";

export default function AssignTask() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch {
        alert("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const createTask = async () => {
    try {
      await API.post("/tasks", {
        title,
        priority,
        assignedTo,
      });
      alert("Task Assigned");
      setTitle("");
      setAssignedTo("");
    } catch {
      alert("Error creating task");
    }
  };

  return (
    <div>
      <h3>Assign Task</h3>

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <br /><br />

      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={createTask}>Assign Task</button>
    </div>
  );
}
