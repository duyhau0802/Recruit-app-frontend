import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import request from "../../configs/request.js";
import AlertComponent from "../../components/AlertComponent.jsx";

function RegisterEmployer() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    ten_cong_ty: "",
    address_cong_ty: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleAlert = (variant, mes) => {
    setAlertMessage(mes);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      handleAlert("error", "Password and confirm password are not the same");
      return;
    }
    request
      .post("/api/auth/registerEmployer", formData)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("user_role", res.data.role_code);
        if (res.data.err === 0) {
          setTimeout(() => {
            handleAlert("success", "Register successfully");
            navigate("/");
          }, 3000);
        }
        if (res.data.err === 1) {
          alert(res.data.mes);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center w-100 h-100">
        <div className="col-4 p-5 ps-5 pe-5 rounded-5 m-2 border border-2 shadow mt-2">
          <h3 className="text-center mt-3 mb-4 fw-bold">
            Register for Employer
          </h3>
          <form onSubmit={onSubmit}>
            <div className="mb-2">
              <label htmlFor="username">Họ và tên</label>
              <input
                type="username"
                placeholder=""
                name="username"
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-2">
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
            <div className="mb-2">
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
            <div className="mb-2">
              <label htmlFor="cpassword">Confirm password</label>
              <input
                type="password"
                placeholder=""
                name="cpassword"
                onChange={handleChange}
                className="form-control"
                required
              />
              {formData.password !== formData.cpassword && (
                <p className="text-danger">
                  Password and confirm password are not the same
                </p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="ten_cong_ty">Tên công ty</label>
              <input
                type="text"
                placeholder=""
                name="ten_cong_ty"
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="address_cong_ty">Địa chỉ công ty</label>
              <input
                type="text"
                placeholder=""
                name="address_cong_ty"
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
      {showAlert && (
        <AlertComponent variant={alertVariant} message={alertMessage} />
      )}
    </>
  );
}

export default RegisterEmployer;
