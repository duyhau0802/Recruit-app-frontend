import { Routes, Route } from "react-router-dom";

import JobTypeList from "../pages/JobType/JobTypeList.jsx";
import UpdateJobType from "../pages/JobType/UpdateJobType.jsx";
import CreateJobType from "../pages/JobType/CreateJobType.jsx";
export default function JobTypeRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<JobTypeList />} />
        <Route path="/create" element={<CreateJobType />} />
        <Route path="/update/:id" element={<UpdateJobType />} />
      </Routes>
    </div>
  );
}
