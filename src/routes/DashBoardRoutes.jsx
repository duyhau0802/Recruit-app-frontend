import { Routes, Route } from "react-router-dom";
import SideBar from "../pages/DashBoard/SideBar";
import DegreeRoutes from "./DegreeRoutes";
import ProvinceRoutes from "./ProvinceRoutes.jsx";
import SalaryRoutes from "./SalaryRoutes.jsx";
import JobTypeRoutes from "./JobTypeRoutes.jsx";
import JobFieldRoutes from "./JobFieldRoutes.jsx";
import JobRoutes from "./JobRoutes.jsx";

import DashBoardHome from "../pages/DashBoard/DashBoardHome";

export default function DashBoardRoutes() {
  return (
    <>
      <div className="row mt-4">
        <div className="col col-3">
          <SideBar />
        </div>
        <div className="col">
          <Routes>
            <Route>
              <Route path="/" element={<DashBoardHome />} />
              <Route path="/degree/*" element={<DegreeRoutes />} />
              <Route path="/province/*" element={<ProvinceRoutes />} />
              <Route path="/salary/*" element={<SalaryRoutes />} />
              <Route path="/job-type/*" element={<JobTypeRoutes />} />
              <Route path="/job-field/*" element={<JobFieldRoutes />} />
              <Route path="/job/*" element={<JobRoutes />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}
