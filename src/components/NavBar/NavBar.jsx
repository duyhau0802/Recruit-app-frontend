import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";

function NavBar() {
  const [theme, setTheme] = useState("dark");
  const auth = localStorage.getItem("access_token");
  // bear ....
  // const username = localStorage.getItem("username");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const location = useLocation();
  useEffect(
    (auth) => {
      // Your side effect logic here
      if (auth) {
        setIsLoggedIn(true);
        window.location.reload();
      }
    },
    [isLoggedIn]
  );

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-md navbar-${theme} bg-${theme} fixed-top`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Recruit App
          </Link>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            // aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-5" id="nav">
            <ul className="navbar-nav text-end pe-3">
              <li className="nav-item" key={"co-hoi-viec-lam"}>
                <NavLink className="nav-link" to="/co-hoi-viec-lam">
                  Cơ hội việc làm
                </NavLink>
              </li>
              <li className="nav-item" key={"danh-sach-cong-ty"}>
                <NavLink className="nav-link" to="/danh-sach-cong-ty">
                  Danh sách công ty
                </NavLink>
              </li>
            </ul>

            {auth ? (
              <ul className="navbar-nav ms-auto text-end pe-3">
                <li className="nav-item" key={"profile"}>
                  <NavLink className="nav-link" to="/profile">
                    {/* {username} */}
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item" key={"dashboard"}>
                  <NavLink className="nav-link" to="/dashboard">
                    {/* {username} */}
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item" key={"logout"}>
                  <button
                    className="btn btn-danger rounded-4 ms-4"
                    style={{ boxShadow: "none" }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto text-end pe-3">
                <li className="nav-item" key={"login"}>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item" key={"register"}>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item" key={"theme"}></li>
              </ul>
              // <></>
            )}
            {/* <button
            className="btn btn-primary rounded-5 mb-1"
            style={{ boxShadow: "none" }}
            onClick={toggleTheme}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button> */}
            <div className="form-check form-switch d-lg-block d-none">
              <input
                type="checkbox"
                id="toggleTheme"
                onChange={toggleTheme}
                checked={theme === "dark"}
                className="form-check-input"
              />
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
