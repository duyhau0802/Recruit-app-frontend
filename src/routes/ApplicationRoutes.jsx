import { Routes, Route } from "react-router-dom";

import ApplicationList from "../pages/Application/ApplicationList.jsx";
import EmployApplicationList from "../pages/Application/EmployApplicationList.jsx";
export default function ApplicationRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ApplicationList />} />
        <Route path="/employer" element={<EmployApplicationList />} />
      </Routes>
    </div>
  );
}
