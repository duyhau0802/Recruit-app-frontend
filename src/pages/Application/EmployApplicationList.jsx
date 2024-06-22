import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../configs/request.js";
import formatDay from "../../utils/formatDay";

const EmployApplicationList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const user_id = localStorage.getItem("user_id");
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    request
      .get(`/api/application/employer/${user_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleted, user_id]);

  const handleDelete = (id) => {
    request
      .delete(`/api/application/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateStatus = (id) => {
    const updateData = {
      status: selectedOption,
    };

    request
      .put(`/api/application/${id}`, updateData)
      .then((res) => {
        console.log(res);
        alert("Cập nhật trạng thái thành công");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return (
    <div className="container mb-5 bg-light shadow-sm pt-2  me-3">
      <h3 className="text-center mt-3 fw-bold ">Application list</h3>
      <div className="d-flex justify-content-center mt-3">
        <div className="w-100">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Job</th>
                  <th>Deadline</th>
                  <th>Tên ứng viên </th>
                  <th>Resume</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.length > 0 &&
                  data.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.jobData.vi_tri}</td>
                        <td>{formatDay(item.jobData.deadline)}</td>
                        <td>{item.ungVienData.userData.username}</td>
                        <td>
                          <Link to={item.resumeData.cv_link} target="_blank">
                            <img
                              src={item.resumeData.cv_link}
                              alt="resume"
                              style={{ width: "80px", height: "80px" }}
                            />
                          </Link>
                        </td>
                        <td>
                          <select
                            name="status"
                            id="status"
                            className="form-select form-select-sm"
                            onChange={handleOptionChange}
                            defaultValue={item.status}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <button
                            className="btn btn-success btn-sm mt-1 ms-2"
                            onClick={() => updateStatus(item.id)}
                          >
                            Update status
                          </button>
                        </td>
                        <td className="d-flex justify-content-center gap-3">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployApplicationList;
