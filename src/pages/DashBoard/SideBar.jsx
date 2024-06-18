import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="container d-flex w100">
      <div className="col bg-light p-3 sticky-top">
        <ul className="list-group">
          <li className="list-group-item list-group-item-action bg-dark text-white">
            <h3>Sidebar</h3>
          </li>
          <li className="list-group-item list-group-item-action">
            <NavLink
              className="text-decoration-none text-black"
              to="/dashboard/account"
            >
              Quản lý tài khoản
            </NavLink>
          </li>
          {/* role employer */}
          <li className="list-group-item list-group-item-action">
            <NavLink
              className="text-decoration-none text-black"
              to="/dashboard/job/create"
            >
              Đăng tin
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action">
            <NavLink
              className="text-decoration-none text-black"
              to="/dashboard/job/list"
            >
              Tin đã đăng
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action">
            <NavLink
              className="text-decoration-none text-black"
              to="/dashboard/degree"
            >
              Degree
            </NavLink>
          </li>
          {/* Add more sidebar items here */}
          <li className="list-group-item list-group-item-action">
            <NavLink
              className="text-decoration-none text-black"
              to="/dashboard/province"
            >
              Province
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action">
            <NavLink
              className="text-decoration-none text-black"
              to="/dashboard/salary"
            >
              Salary
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action">
            <NavLink
              className="text-decoration-none text-black"
              to="/dashboard/job-type"
            >
              Job type
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action">
            <NavLink
              className="text-decoration-none text-black"
              to="/dashboard/job-field"
            >
              Job field
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
