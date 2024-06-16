import React, { useState, useEffect } from "react";
import request from "../../configs/request.js";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSalary() {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    request
      .get(`/api/salary/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  }, [id]);

  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    request
      .put(`/api/salary/${id}`, formData)
      .then((res) => {
        setTimeout(() => {
          navigate(-1);
        }, 200);
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
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
            <h4 className="text-center mb-3">Update Salary</h4>
            <form onSubmit={onSubmit}>
              <div className="mb-2">
                <label htmlFor="code">Code</label>

                <input
                  type="text"
                  placeholder=""
                  name="code"
                  value={formData.code || ""}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="value">Salary</label>

                <input
                  type="text"
                  placeholder=""
                  name="value"
                  value={formData.value || ""}
                  onChange={handleChange}
                  className="form-control form-control-sm"
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

export default UpdateSalary;
