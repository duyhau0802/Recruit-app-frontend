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
import RequireAuth from "../components/RequireAuth.jsx";
import SaveJobList from "../pages/SavedJob/SaveJobList.jsx";

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
              {/* role Admin */}
              <Route element={<RequireAuth allowedRoles={["R1"]} />}>
                <Route path="/degree/*" element={<DegreeRoutes />} />
                <Route path="/province/*" element={<ProvinceRoutes />} />
                <Route path="/salary/*" element={<SalaryRoutes />} />
                <Route path="/job-type/*" element={<JobTypeRoutes />} />
                <Route path="/job-field/*" element={<JobFieldRoutes />} />
                <Route path="/user/*" element={<UserRoutes />} />
              </Route>
              {/* role employer */}
              <Route element={<RequireAuth allowedRoles={["R2", "R1"]} />}>
                <Route path="/job/*" element={<JobRoutes />} />
              </Route>
              {/* role applicant */}
              <Route element={<RequireAuth allowedRoles={["R3"]} />}>
                <Route path="/resume/*" element={<ResumeRoutes />} />
                <Route path="/saved-job-list" element={<SaveJobList />} />
              </Route>
              <Route path="/account/*" element={<AccountRoutes />} />
              <Route path="/application/*" element={<ApplicationRoutes />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}
