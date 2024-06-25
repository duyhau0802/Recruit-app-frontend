import { Routes, Route } from "react-router-dom";

import UpdateAccountApplicant from "../pages/Account/UpdateAccountApplicant.jsx";
import UpdateAccountEmployer from "../pages/Account/UpdateAccountEmployer.jsx";
import UpdateAccountAdmin from "../pages/Account/UpdateAccountAdmin.jsx";
import UserList from "../pages/Job/JobList.jsx";

export default function JobRoutes() {
  return (
    <div>
      <Routes>
        {/* cap nhat thong tin tai khoan */}
        <Route path="/" element={<UpdateAccountApplicant />} />
        <Route path="/employer" element={<UpdateAccountEmployer />} />
        <Route path="/admin" element={<UpdateAccountAdmin />} />
        {/* Private route  : admin role */}
        <Route path="/list" element={<UserList />} />
      </Routes>
    </div>
  );
}
