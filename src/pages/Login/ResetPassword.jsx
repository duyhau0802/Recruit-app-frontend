import React, { useState } from "react";
import "./style.css";
import request from "../../configs/request.js";
import { useNavigate, useParams } from "react-router-dom";
import AlertComponent from "../../components/AlertComponent.jsx";

function ResetPassword() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const handleAlert = (variant, mes) => {
    setAlertMessage(mes);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    cpassword: "",
  });
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      handleAlert("error", "Password and confirm password are not the same");
      return;
    }
    request
      .post(`/api/auth/password-reset/${token}`, formData)
      .then((res) => {
        if (res.data.mes === "Invalid token") {
          handleAlert("error", res.data.mes);
          return;
        }
        if (res.data.mes === "Password reset successfully") {
          handleAlert("success", res.data.mes);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="d-flex justify-content-center w-100 h-100">
      {showAlert && (
        <AlertComponent message={alertMessage} variant={alertVariant} />
      )}
      <div className="col-4 p-5 ps-5 pe-5 rounded-5 m-2 border border-2 shadow mt-3">
        <div className="d-flex justify-content-center ">
          <img
            src="/images/Recruit_App/logo.png"
            alt="logo"
            className="img-fluid rounded-2 me-2 shadow"
            style={{ width: "100px", height: "80px" }}
          />
        </div>
        <h3 className="text-center mt-3 fw-bold">Set new password</h3>
        <p className="text-center mt-2">Enter your new pass</p>
        <form onSubmit={onSubmit}>
          <div className="mb-2 mt-4">
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
          <div className="mb-2 mt-4">
            <label htmlFor="cpassword">Confirm Password</label>
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

export default ResetPassword;
