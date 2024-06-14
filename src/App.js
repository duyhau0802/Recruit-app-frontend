import "./style.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
