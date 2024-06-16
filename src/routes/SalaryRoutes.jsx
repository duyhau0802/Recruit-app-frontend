import { Routes, Route } from "react-router-dom";

import SalaryList from "../pages/Salary/SalaryList.jsx";
import UpdateSalary from "../pages/Salary/UpdateSalary.jsx";
import CreateSalary from "../pages/Salary/CreateSalary.jsx";
export default function SalaryRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SalaryList />} />
        <Route path="/create" element={<CreateSalary />} />
        <Route path="/update/:id" element={<UpdateSalary />} />
      </Routes>
    </div>
  );
}
