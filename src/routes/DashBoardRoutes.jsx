import { Routes, Route } from "react-router-dom";
import SideBar from "../pages/DashBoard/SideBar";
import DegreeRoutes from "./DegreeRoutes";
import ProvinceRoutes from "./ProvinceRoutes.jsx";
import SalaryRoutes from "./SalaryRoutes.jsx";
import JobTypeRoutes from "./JobTypeRoutes.jsx";
import JobFieldRoutes from "./JobFieldRoutes.jsx";
import AccountRoutes from "./AccountRoutes.jsx";
import JobRoutes from "./JobRoutes.jsx";
import ResumeRoutes from "./ResumeRoutes.jsx";
import ApplicationRoutes from "./ApplicationRoutes.jsx";
import UserRoutes from "./UserRoutes.jsx";

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
              <Route path="/*" element={<AccountRoutes />} />
              <Route path="/degree/*" element={<DegreeRoutes />} />
              <Route path="/province/*" element={<ProvinceRoutes />} />
              <Route path="/salary/*" element={<SalaryRoutes />} />
              <Route path="/job-type/*" element={<JobTypeRoutes />} />
              <Route path="/job-field/*" element={<JobFieldRoutes />} />
              <Route path="/job/*" element={<JobRoutes />} />
              <Route path="/account/*" element={<AccountRoutes />} />
              <Route path="/resume/*" element={<ResumeRoutes />} />
              <Route path="/application/*" element={<ApplicationRoutes />} />
              <Route path="/user/*" element={<UserRoutes />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}
