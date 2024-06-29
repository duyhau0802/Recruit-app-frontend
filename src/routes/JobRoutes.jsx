import { Routes, Route } from "react-router-dom";

import JobList from "../pages/Job/JobList.jsx";
import JobListAdmin from "../pages/Job/JobListAdmin.jsx";
import CreateJob from "../pages/Job/CreateJob.jsx";
import UpdateJob from "../pages/Job/UpdateJob.jsx";
export default function JobRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/create" element={<CreateJob />} />
        <Route path="/list" element={<JobList />} />
        <Route path="/listAdmin" element={<JobListAdmin />} />
        <Route path="/update/:id" element={<UpdateJob />} />
      </Routes>
    </div>
  );
}
