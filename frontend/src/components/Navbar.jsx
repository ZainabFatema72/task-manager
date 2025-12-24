import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Task Manager</h3>

      <div style={styles.links}>
        {!token && (
          <Link to="/" style={styles.link}>
            Login
          </Link>
        )}

        {/* 👩‍💼 Admin */}
        {token && role === "admin" && (
          <>
            <Link to="/admin" style={styles.link}>
              Admin Dashboard
            </Link>
          </>
        )}

        {token && role === "user" && (
          <Link to="/user" style={styles.link}>
            User Dashboard
          </Link>
        )}

        {token && (
          <button onClick={logout} style={styles.logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#1e40af",
    color: "white",
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  logout: {
    background: "white",
    color: "#1e40af",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
  },
};







