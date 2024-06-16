import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../configs/request.js";

const SalaryList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    request
      .get("/api/salary")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleted]);

  const handleDelete = (id) => {
    request
      .delete(`/api/salary/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid w-100 mb-5">
      <h3 className="text-center mt-3 fw-bold ">Salary list</h3>

      <div className="row justify-content-center">
        <Link className="btn btn-success w-25 mt-4" to="./create">
          Add Salary
        </Link>
        {/* <div className="col-md-4 input-group m-2 mt-3 w-75">
          <input type="text" className="form-control" placeholder="Search" />
          <button className="btn btn-primary">Search</button>
        </div> */}
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

export default SalaryList;
