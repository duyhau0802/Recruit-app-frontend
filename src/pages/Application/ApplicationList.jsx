import React, { useEffect, useState } from "react";
import request from "../../configs/request.js";
import formatDay from "../../utils/formatDay";

const ApplicationList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    request
      .get(`/api/application/${user_id}`)
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
                  {/* <th>Tên ứng viên </th> */}
                  {/* <th>Resume</th> */}
                  <th>Status</th>
                  <th>Create At</th>
                  <th>Ten cong ty</th>
                  <th>Logo cong ty</th>
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
                        {/* <td>{item.ungVienData.userData.username}</td> */}
                        {/* <td>
                          <Link to={item.resumeData.cv_link} target="_blank">
                            <img
                              src={item.resumeData.cv_link}
                              alt="resume"
                              style={{ width: "80px", height: "80px" }}
                            />
                          </Link>
                        </td> */}
                        <td>{item.status}</td>
                        <td>{formatDay(item.createdAt)}</td>
                        <td>{item.employerData.ten_cong_ty}</td>
                        <td>
                          <img
                            src={
                              !item.employerData.logo_cong_ty
                                ? "https://timviec.com.vn/default/images/logo_company_80x80.png"
                                : item.employerData.logo_cong_ty
                            }
                            alt="logo"
                            style={{ width: "80px", height: "80px" }}
                          />
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

export default ApplicationList;
