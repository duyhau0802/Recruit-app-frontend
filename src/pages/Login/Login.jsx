import React, { useState } from "react";
import "./style.css";
import request from "../../configs/request.js";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../../components/AlertComponent.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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
      .post("/api/auth/login", formData)
      .then((res) => {
        setAlertMessage(res.data.mes);
        setShowAlert(true);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("user_id", res.data.userId);
        localStorage.setItem("user_role", res.data.role_code);
        setTimeout(() => {
          navigate("/", { state: { token: res.data.access_token } });
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center w-100 h-100">
      {showAlert && <AlertComponent message={alertMessage} />}
      <div className="col-4 p-5 ps-5 pe-5 rounded-5 m-2 border border-2 shadow mt-3">
        <div className="d-flex justify-content-center ">
          <img
            src="/images/Recruit_App/logo.png"
            alt="logo"
            className="img-fluid rounded-2 me-2 shadow"
            style={{ width: "100px", height: "80px" }}
          />
        </div>
        <h3 className="text-center mt-3 fw-bold">Login to Recruit App</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-2 mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder=""
              name="email"
              onChange={handleChange}
              className="form-control"
              autoFocus
              required
            />
          </div>
          <div className="mb-2 mt-2">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              placeholder=""
              name="password"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success mb-2">
              Submit
            </button>
            <p className="text-center mt-2">
              <Link to="/reset-password">Quên mật khẩu</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
