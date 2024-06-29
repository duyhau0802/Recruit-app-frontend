import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

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
      }
    },
    [isLoggedIn]
  );

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };
  const user_role = localStorage.getItem("user_role");
  var role_value = "";
  if (user_role === "R1") {
    role_value = "admin";
  } else if (user_role === "R2") {
    role_value = "employer";
  } else if (user_role === "R3") {
    role_value = "applicant";
  }
  return (
    <>
      <nav className={`navbar navbar-expand-md navbar-dark bg-dark`}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={"/images/Recruit_App/logo.png"}
              alt=""
              className="img-fluid rounded-2 me-2"
              style={{ width: "50px", height: "40px" }}
            />
            <div className="d-inline logo-name fw-bold pt-5">Recruit App</div>
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
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/account/${role_value}`}
                        >
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
                <li className="nav-item ms-2" key={"login"}>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item ms-2" key={"register"}>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item ms-2" key={"register-employer"}>
                  <NavLink className="nav-link" to="/register-employer">
                    Employer Register
                  </NavLink>
                </li>
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
