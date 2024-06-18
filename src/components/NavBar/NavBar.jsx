import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  // bear ....
  const username = localStorage.getItem("username");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(
    (token) => {
      if (token) {
        setIsLoggedIn(true);
        window.location.reload();
      }
    },
    [isLoggedIn]
  );

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <nav className={`navbar navbar-expand-md navbar-dark bg-dark`}>
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
            {/* <ul className="navbar-nav text-end pe-3">
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
            </ul> */}

            {token ? (
              <>
                <ul className="navbar-nav ms-auto text-end pe-3">
                  <div className="dropdown mt-2">
                    <Link
                      data-bs-toggle="dropdown"
                      style={{
                        textDecoration: "none",
                        color: "rgba(255,255,255,.80)",
                      }}
                    >
                      {username}🔽
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to="/dashboard">
                          Dashboard
                        </NavLink>
                      </li>
                    </ul>
                  </div>
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
              </>
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
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
