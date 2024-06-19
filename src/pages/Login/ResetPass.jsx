import React, { useState } from "react";
import "./style.css";
import request from "../../configs/request.js";
import { Link } from "react-router-dom";

function ResetPass() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    request
      .post("/api/auth/password-reset", formData)
      .then((res) => {
        alert("Check your email to reset your password");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center w-100 h-100">
      <div className="col-4 p-5 ps-5 pe-5 rounded-5 m-2 border border-2 shadow mt-3">
        <div className="d-flex justify-content-center ">
          <img
            src="/images/Recruit_App/logo.png"
            alt="logo"
            className="img-fluid rounded-2 me-2 shadow"
            style={{ width: "100px", height: "80px" }}
          />
        </div>
        <h3 className="text-center mt-3 fw-bold">Forgot your password ? </h3>
        <p className="text-center mt-2">
          Enter your email and we will send you a link to reset your password
        </p>
        <form onSubmit={onSubmit}>
          <div className="mb-2 mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder=""
              name="email"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success mb-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
