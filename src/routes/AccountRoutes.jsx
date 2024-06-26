import { Routes, Route } from "react-router-dom";

import UpdateAccountApplicant from "../pages/Account/UpdateAccountApplicant.jsx";
import UpdateAccountEmployer from "../pages/Account/UpdateAccountEmployer.jsx";
import UpdateAccountAdmin from "../pages/Account/UpdateAccountAdmin.jsx";
import UserList from "../pages/Job/JobList.jsx";
import RequireAuth from "../components/RequireAuth.jsx";

export default function JobRoutes() {
  return (
    <div>
      <Routes>
        {/* cap nhat thong tin tai khoan */}
        <Route element={<RequireAuth allowedRoles={["R3"]} />}>
          <Route path="/applicant" element={<UpdateAccountApplicant />} />
        </Route>
        {/* Private route  : employer role */}
        <Route element={<RequireAuth allowedRoles={["R2"]} />}>
          <Route path="/employer" element={<UpdateAccountEmployer />} />
        </Route>
        {/* Private route  : admin role */}
        <Route element={<RequireAuth allowedRoles={["R1"]} />}>
          <Route path="/admin" element={<UpdateAccountAdmin />} />
          <Route path="/list" element={<UserList />} />
        </Route>
      </Routes>
    </div>
  );
}
