import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./style.css";

function NavBar() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          Recruit App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse ms-5"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
          {/* <div className="form-check form-switch">
            <input
              type="checkbox"
              id="toggleTheme"
              onChange={toggleTheme}
              className="form-check-input"
            />
          </div> */}
          <button
            className="btn btn-outline-success border border-primary rounded-5"
            onClick={toggleTheme}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
