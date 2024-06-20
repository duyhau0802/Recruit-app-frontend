import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../configs/request.js";

const UserList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    request
      .get("/api/user")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleted]);

  const handleDelete = (id) => {
    request
      .delete(`/api/user/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid w-100 mb-5">
      <h3 className="text-center mt-3 fw-bold ">User list</h3>

      <div className="row justify-content-center">
        <Link className="btn btn-success w-25 mt-4" to="./create">
          Add User
        </Link>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className=" w-100">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Avatar</th>
                  <th>Role Code</th>
                  <th>Create At</th>
                  <th>Update At</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.avatar}</td>
                      <td>{item.role_code}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
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

export default UserList;
