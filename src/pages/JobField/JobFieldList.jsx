import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../configs/request.js";

const JobFieldList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    request
      .get("/api/job-field")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleted]);

  const handleDelete = (id) => {
    request
      .delete(`/api/job-field/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mb-5">
      <h3 className="text-center mt-3 fw-bold ">Job Field list</h3>

      <div className="row d-flex justify-content-center">
        <Link className="btn btn-success w-25 mt-4" to="./create">
          Add Job Field
        </Link>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className=" w-75">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Code</th>
                  <th>Value</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.code}</td>
                      <td>{item.value}</td>
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

export default JobFieldList;
