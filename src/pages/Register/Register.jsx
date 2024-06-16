import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import request from "../../configs/request.js";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
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
    if (formData.password !== formData.cpassword) {
      alert("Password and confirm password are not the same");
      return;
    }
    request
      .post("/api/v1/auth/register", formData)
      .then((res) => {
        if (res.data.err === 0) {
          alert(res.data.mes);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
        if (res.data.err === 1) {
          alert(res.data.mes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center w-100 h-100">
      <div className="form-sign-up rounded m-2 border border-2 border-primary">
        <h1 className="text-center">Register</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-2 form-floating">
            <input
              type="text"
              placeholder=""
              name="username"
              onChange={handleChange}
              className="form-control"
              required
            />
            <label htmlFor="username">Họ và tên</label>
          </div>
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
          <div className="mb-2 form-floating">
            <input
              type="password"
              placeholder=""
              name="cpassword"
              onChange={handleChange}
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
