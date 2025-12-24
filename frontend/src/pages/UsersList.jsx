import { useEffect, useState } from "react";
import API from "../api";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        alert("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Users & Assigned Tasks</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Tasks</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.tasks.length === 0 ? (
                  <span>No Tasks</span>
                ) : (
                  <ul>
                    {u.tasks.map((t) => (
                      <li key={t._id}>
                        <b>{t.title}</b> – {t.status}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
