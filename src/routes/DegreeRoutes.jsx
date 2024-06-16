import { Routes, Route } from "react-router-dom";

import DegreeList from "../pages/Degree/DegreeList.jsx";
import UpdateDegree from "../pages/Degree/UpdateDegree.jsx";
import CreateDegree from "../pages/Degree/CreateDegree.jsx";
export default function DegreeRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DegreeList />} />
        <Route path="/create" element={<CreateDegree />} />
        <Route path="/update/:id" element={<UpdateDegree />} />
      </Routes>
    </div>
  );
}
