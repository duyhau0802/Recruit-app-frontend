import React, { useState } from "react";
import "./style.css";
import request from "../../utils/request.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (event.target.checkValidity()) {
      request
        .post("/auth/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          const hashedPassword = response.data;
          console.log(hashedPassword);
          // if (response.data.message === "success")
          //   setLoginStatus("Login success. Welcome " + response.data);
        });
    }
  };
  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w 100-h m-2">
      <div className="form-container p-5 rounded border border-2 border-primary">
        <h1 className="text-center mb-4">Log In</h1>
        <form noValidate className={isSubmitted ? "was-validated" : ""}>
          <div className="mb-2 form-floating">
            <input
              type="email"
              placeholder=""
              id="email"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="mb-2 form-floating">
            <input
              type="password"
              placeholder=""
              id="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="mb-2 form-check form-switch">
            <input type="checkbox" id="check" className="form-check-input" />
            <label
              htmlFor="check"
              className="form-check-label ms-2 mt-1"
              noValidate
            >
              Remember me
            </label>
          </div>
          <div className="mb-2">
            <a href="/forgot-pass" className="text-primary me-3">
              Forgot password ?
            </a>
            <a href="/register" className="ms-2 text-primary ">
              Register
            </a>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
        <p>{loginStatus}</p>
      </div>
    </div>
  );
}

export default Login;
