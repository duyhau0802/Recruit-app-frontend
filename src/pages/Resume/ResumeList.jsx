import React, { useEffect, useState } from "react";
import request from "../../configs/request.js";
import AlertComponent from "../../components/AlertComponent.jsx";
import { Link } from "react-router-dom";

const ResumeList = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const user_id = localStorage.getItem("user_id");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false); // Track upload status
  useEffect(() => {
    if (isUploadSuccessful) {
      // Re-render the resumeList component to display the uploaded CV
      setIsUploadSuccessful(false); // Reset upload status for future uploads
    }
  }, [isUploadSuccessful]);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleCreateCvSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("cv_link", selectedFile); // Key should match server-side expectation
      formData.append("id_user", user_id);
      await request
        .post("/api/resume", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        })
        .then((response) => {
          console.log(response.data);
          setIsUploadSuccessful(true);
          setAlertMessage(response.data.mes);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error uploading CV:", error);
          setAlertMessage("Error uploading CV. Please try again."); // Inform user
          setShowAlert(true);
        });
    }
  };
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
  }, [deleted, user_id, isUploadSuccessful]);

  const handleDelete = (id, file_name) => {
    request
      .delete(`/api/resume/?ids[0]=${id}&file_name[0]=${file_name}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showAlert && <AlertComponent message={alertMessage} />}
      <div className="container mb-5 bg-light shadow-sm pt-2 me-3">
        <h3 className="text-center mt-3 fw-bold ">Resume list</h3>
        <div className="row d-flex justify-content-center">
          <button
            className="btn btn-success mt-3 me-4 w-25"
            data-bs-toggle="modal"
            data-bs-target="#modalAddResume"
          >
            Thêm cv
          </button>
          <div className="modal fade " id="modalAddResume">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Chọn cv của bạn</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    data-bs-target="#modalApply"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-group d-flex">
                    <form onSubmit={handleCreateCvSubmit}>
                      <label htmlFor="cv_link">CV</label>
                      <input
                        type="file"
                        className="form-select"
                        onChange={onFileChange}
                        name="cv_file"
                        id="cv_file"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary text-center mt-3"
                        data-bs-dismiss="modal"
                      >
                        Upload
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <div className="w-100">
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>CV_image</th>
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
                          <td>
                            <Link to={item.cv_link} target="_blank">
                              <img
                                key={item.id}
                                src={item.cv_link}
                                alt={item.id}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                              />
                            </Link>
                          </td>
                          <td>{item.file_name}</td>
                          <td className="d-flex justify-content-center gap-3">
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                handleDelete(item.id, item.file_name)
                              }
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
    </>
  );
};

export default ResumeList;
