import { Routes, Route } from "react-router-dom";

import JobFieldList from "../pages/JobField/JobFieldList.jsx";
import UpdateJobField from "../pages/JobField/UpdateJobField.jsx";
import CreateJobField from "../pages/JobField/CreateJobField.jsx";
export default function JobFieldRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<JobFieldList />} />
        <Route path="/create" element={<CreateJobField />} />
        <Route path="/update/:id" element={<UpdateJobField />} />
      </Routes>
    </div>
  );
}
