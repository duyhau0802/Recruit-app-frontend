import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import DegreeList from "../Degree/DegreeList";
// import './Dashboard.css'; // Import your custom CSS (optional)

const Dashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-dark text-white py-3">
        <div className="container d-flex justify-content-between">
          <h1 className="m-0">
            Dashboard Role : {localStorage.getItem("role")}
          </h1>
        </div>
      </header>

      <div className="container d-flex flex-row flex-wrap h-100">
        <div className="col-md-2 bg-light p-3 sticky-top">
          <h5 className="mb-3">Sidebar</h5>
          <ul className="list-group">
            <li className="list-group-item list-group-item-action active">
              Dashboard
            </li>
            <li className="list-group-item list-group-item-action">
              <Link
                className="text-decoration-none text-black"
                to="/dashboard/degree"
              >
                Degree
              </Link>
            </li>

            <li className="list-group-item list-group-item-action">Item 2</li>
            {/* Add more sidebar items here */}
          </ul>
        </div>

        <div className="col md-10 p-3">
          <p>Your main content</p>
          <Routes>
            <Route path="dashboard/degree/*" element={<DegreeList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
