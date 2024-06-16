import React, { useState } from "react";
import "./style.css";
import request from "../../configs/request.js";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    request
      .post("/api/v1/auth/login", formData)
      .then((res) => {
        alert(res.data.mes);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        setTimeout(() => {
          navigate("/", { state: { token: res.data.access_token } });
        }, 1000);
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  };
  return (
    <div className="login template d-flex justify-content-center align-items-center w-100 h-100">
      <div className="form-sign-up rounded m-2 border border-2 border-primary">
        <h1 className="text-center">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-2 form-floating">
            <input
              type="email"
              placeholder=""
              name="email"
              onChange={handleChange}
              className="form-control"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="mb-2 form-floating">
            <input
              type="password"
              placeholder=""
              name="password"
              onChange={handleChange}
              className="form-control"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
            <p className="text-center mt-2">
              <Link to="/login">Quên mật khẩu</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
