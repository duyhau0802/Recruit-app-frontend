import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  const role = localStorage.getItem("user_role");
  return (
    <div
      className="d-flex flex-column text-white bg-dark bg-opacity-0 fixed-top col-3"
      style={{ marginTop: "80px" }}
    >
      <div className="col bg-light p-3 sticky-top">
        <ul className="list-group">
          <li className="list-group-item list-group-item-action bg-dark text-white text-center">
            <h3>Sidebar</h3>
          </li>
          {/* role applicant */}
          {role === "R3" && (
            <>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/account"
                >
                  Quản lý tài khoản Applicant
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/resume/"
                >
                  Resume list
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/job/list"
                >
                  Tin ưa thích
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/application"
                >
                  Danh sách đã ứng tuyến
                </NavLink>
              </li>
            </>
          )}
          {/* role employer */}
          {role === "R2" && (
            <>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/account/employer"
                >
                  Quản lý tài khoản Employer
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/job/create"
                >
                  Đăng tin
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/job/list"
                >
                  Tin đã đăng
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/application/employer"
                >
                  Danh sách ứng tuyển
                </NavLink>
              </li>
            </>
          )}
          {/* role admin */}
          {role === "R1" && (
            <>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/degree"
                >
                  Degree
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/province"
                >
                  Province
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/salary"
                >
                  Salary
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/job-type"
                >
                  Job type
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/job-field"
                >
                  Job field
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-action">
                <NavLink
                  className="text-decoration-none text-black d-block w-100 text-center"
                  to="/dashboard/user"
                >
                  User
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
