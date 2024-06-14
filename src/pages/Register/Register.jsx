import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import request from "../../utils/request.js";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Password and confirm password are not the same");
      return;
    }
    register();
  };

  const register = () => {
    request
      .post("/auth/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        // if (response.data.message === "success") {
        //   setTimeout(() => {
        //     window.location.href = "/";
        //   }, 1000);
        // }
      });
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center w-100 h-100">
      <div className="form-sign-up rounded m-2 border border-2 border-primary">
        <h1 className="text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 form-floating">
            <input
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
            <label htmlFor="username">Họ và tên</label>
          </div>
          <div className="mb-2 form-floating">
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="mb-2 form-floating">
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="mb-2 form-floating">
            <input
              type="password"
              placeholder=""
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              className="form-control"
              required
            />
            <label htmlFor="cpassword">Confirm password</label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
            <p className="text-center mt-2">
              Already have account ? <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
