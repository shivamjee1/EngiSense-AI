import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <nav className="app-navbar">
      <NavLink to="/dashboard" className="nav-brand">
        <span className="nav-brand-mark">E</span>
        <span>EngiSense AI</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/dashboard" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/datasets" className={navClass}>
          Datasets
        </NavLink>

        <NavLink to="/documents" className={navClass}>
          Documents
        </NavLink>

        <NavLink to="/history" className={navClass}>
          History
        </NavLink>

        <button
          className="nav-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;