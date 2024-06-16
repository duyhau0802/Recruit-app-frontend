import "./style.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Profile from "./pages/Profile/Profile.jsx";

import DashBoardRoutes from "./routes/DashBoardRoutes.jsx";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="pt-5"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<DashBoardRoutes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <div className="pt-5"></div>
      <Footer />
    </div>
  );
}

export default App;
