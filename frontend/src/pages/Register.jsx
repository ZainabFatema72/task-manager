import { useState } from "react";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert("User Registered");
      window.location.href = "/";
    } catch (err) {
      alert("Registration failed");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} /><br /><br />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br /><br />

      <select onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
      </select><br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
