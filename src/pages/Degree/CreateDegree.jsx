import React, { useState } from "react";
import request from "../../configs/request.js";
import { useNavigate } from "react-router-dom";

function CreateDegree() {
  const [formData, setFormData] = useState({
    code: "",
    value: "",
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
      .post("/api/degree", formData)
      .then((res) => {
        setTimeout(() => {
          navigate(-1);
        }, 200);
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  return (
    <div className="container w-50 h-75">
      <button
        className="btn btn-primary mt-4 ms-5"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="col d-flex justify-content-center">
        <div className="row w-75 justify-content-center">
          <div className="form-sign-up rounded m-2 border border-2 border-primary">
            <h4 className="text-center mb-3">Create Degree</h4>
            <form onSubmit={onSubmit}>
              <div className="mb-2">
                <label htmlFor="code" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  onChange={handleChange}
                  className="form-control from-control-sm"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="value" className="form-label">
                  Degree
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="value"
                  id="value"
                  onChange={handleChange}
                  className="form-control from-control-sm"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary mb-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDegree;
