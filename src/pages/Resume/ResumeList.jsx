import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../configs/request.js";

const ResumeList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }

    request
      .get(`/api/resume/${user_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleted, user_id]);

  const handleDelete = (id) => {
    request
      .delete(`/api/resume/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mb-5 bg-light shadow-sm pt-2 me-3">
      <h3 className="text-center mt-3 fw-bold ">Resume list</h3>
      <div className="row d-flex justify-content-center">
        <Link className="btn btn-success w-25 mt-4" to="./create">
          Add Resume
        </Link>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="w-100">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>CV_link</th>
                  <th>filename</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.length > 0 &&
                  data.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.cv_link}</td>
                        <td>{item.file_name}</td>
                        <td className="d-flex justify-content-center gap-3">
                          <Link
                            className="btn btn-primary"
                            to={`./update/${item.id}`}
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

export default ResumeList;
