import "./style.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
// import ResetPass from "./pages/Login/ResetPass.jsx";
import ResetPassword from "./pages/Login/ResetPassword.jsx";
import Register from "./pages/Register/Register.jsx";
import RegisterEmployer from "./pages/Register/RegisterEmployer.jsx";
import Layout from "./components/Layout.jsx";
import EmployerDetail from "./pages/Employer/EmployerDetail.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import DashBoardRoutes from "./routes/DashBoardRoutes.jsx";
import JobDetail from "./pages/Job/JobDetail.jsx";

const ROLES = {
  Admin: "R1",
  Employer: "R2",
  Applicant: "R3",
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-employer" element={<RegisterEmployer />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/employer/:id" element={<EmployerDetail />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* protect routes*/}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.Admin, ROLES.Employer, ROLES.Applicant]}
            />
          }
        >
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard/*" element={<DashBoardRoutes />} />
        </Route>
        {/* catch all */}
        <Route
          path="*"
          element={<h1 className="text-center mt-4">404 Pages not found</h1>}
        />
      </Route>
    </Routes>
  );
}

export default App;
