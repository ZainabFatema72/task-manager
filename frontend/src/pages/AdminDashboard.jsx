import { useState } from "react";
import AssignTask from "./AssignTask";
import Register from "./Register";
import UsersList from "./UsersList";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Dashboard</h2>

      {/* 🔘 BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setActiveTab("assign")}>
          Assign Task & Mark Priority

        </button>

        <button
          onClick={() => setActiveTab("create")}
          style={{ marginLeft: 10 }}
        >
          Create User
        </button>

        <button
          onClick={() => setActiveTab("users")}
          style={{ marginLeft: 10 }}
        >
          Users & Tasks
        </button>
      </div>

      {/* 📌 CONTENT */}
      {activeTab === "assign" && <AssignTask />}
      {activeTab === "create" && <Register />}
      {activeTab === "users" && <UsersList />}
    </div>
  );
}
