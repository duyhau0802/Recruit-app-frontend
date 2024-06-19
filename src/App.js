import "./style.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import ResetPass from "./pages/Login/ResetPass.jsx";
import ResetPassword from "./pages/Login/ResetPassword.jsx";
import Register from "./pages/Register/Register.jsx";
import RegisterEmployer from "./pages/Register/RegisterEmployer.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DashBoardRoutes from "./routes/DashBoardRoutes.jsx";
import JobDetail from "./pages/Job/JobDetail.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerEmployer" element={<RegisterEmployer />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard/*" element={<DashBoardRoutes />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
