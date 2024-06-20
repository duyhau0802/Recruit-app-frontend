import { Routes, Route } from "react-router-dom";

import ResumeList from "../pages/Resume/ResumeList.jsx";
// import CreateResume from "../pages/Resume/CreateResume.jsx";
// import UpdateResume from "../pages/Resume/UpdateResume.jsx";
export default function ResumeRoutes() {
  return (
    <div>
      <Routes>
        {/* <Route path="/create" element={<CreateResume />} /> */}
        <Route path="/" element={<ResumeList />} />
        {/* <Route path="/update/:id" element={<UpdateResume />} /> */}
      </Routes>
    </div>
  );
}
