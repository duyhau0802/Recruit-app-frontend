import { Routes, Route } from "react-router-dom";

import ApplicationList from "../pages/Application/ApplicationList.jsx";
import EmployApplicationList from "../pages/Application/EmployApplicationList.jsx";
import RequireAuth from "../components/RequireAuth.jsx";

export default function ApplicationRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<RequireAuth allowedRoles={["R3"]} />}>
          <Route path="/" element={<ApplicationList />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["R2"]} />}>
          <Route path="/employer" element={<EmployApplicationList />} />
        </Route>
      </Routes>
    </div>
  );
}
