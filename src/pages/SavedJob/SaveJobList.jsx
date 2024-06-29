import React, { useEffect, useState } from "react";
import request from "../../configs/request.js";
import formatDay from "../../utils/formatDay";
import { Link } from "react-router-dom";

const Saved_jobList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    request
      .get(`/api/saved-job/${user_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleted, user_id]);

  const handleDelete = (id) => {
    request
      .delete(`/api/saved-job/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mb-5 bg-light shadow-sm pt-2  me-3">
      <h3 className="text-center mt-3 fw-bold ">Tin ưa thích</h3>
      <div className="d-flex justify-content-center mt-3">
        <div className="w-100">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Job</th>
                  <th>Deadline</th>
                  <th>Create At</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/job/${item.jobData.id}`}>
                          {item.jobData.vi_tri}
                        </Link>
                      </td>
                      <td>{formatDay(item.jobData.deadline)}</td>
                      <td>{formatDay(item.createdAt)}</td>
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

export default Saved_jobList;
