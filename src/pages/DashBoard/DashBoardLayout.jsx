import React from "react";
import { Route, Routes } from "react-router-dom";
import DegreeList from "../Degree/DegreeList";
import SideBar from "./SideBar";
const DashboardLayout = () => {
  return (
    <>
      <SideBar />
      <div className="d-flex flex-column min-vh-100">
        <div className="container d-flex flex-row flex-wrap h-100">
          <div className="col md-10 p-3">
            {/* Your main content goes here */}
            <p>Your main content</p>
            <Routes>
              <Route path="dashboard/degree/*" element={<DegreeList />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
