import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../configs/request.js";

const JobList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const user_id = localStorage.getItem("user_id");
  const formatDay = (unformattedDate) => {
    const dateObject = new Date(unformattedDate);
    // Extract components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; //getMonth() returns 0-based index
    const day = dateObject.getDate();
    // Format the date for MySQL
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    request
      .get(`/api/job/list/${user_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleted, user_id]);

  const handleDelete = (id) => {
    request
      .delete(`/api/job/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h3 className="text-center mt-3 fw-bold ">Job list</h3>
      <div className="d-flex justify-content-center mt-3">
        <div className=" w-100">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Vị trí</th>
                  <th>Số lượng</th>
                  <th>Job type</th>
                  <th>Salary</th>
                  <th>Province</th>
                  <th>Job field</th>
                  <th>deadline</th>
                  <th>create at</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.vi_tri}</td>
                      <td>{item.so_luong}</td>
                      <td>{item.job_type_code}</td>
                      <td>{item.salary_code}</td>
                      <td>{item.province_cong_viec}</td>
                      <td>{item.job_field_code}</td>
                      <td>{formatDay(item.deadline)}</td>
                      <td>{formatDay(item.createdAt)}</td>
                      <td className="d-flex justify-content-center">
                        <Link
                          className="btn btn-primary"
                          to={`../update/${item.id}`}
                        >
                          Update
                        </Link>
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

export default JobList;
