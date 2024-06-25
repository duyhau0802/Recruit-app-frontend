import React, { useState, useEffect } from "react";
import request from "../../configs/request.js";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import AlertComponent from "../../components/AlertComponent.jsx";

const UpdateAccountAdmin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [isSummitSuccessful, setIsSummitSuccessful] = useState(false);

  const user_id = localStorage.getItem("user_id");

  // fetch user data
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
    email: "",
  });
  useEffect(() => {
    const fetchUserData = async (user_id) => {
      request
        .get(`/api/user/${user_id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log("Error fetching user data", err);
        });
    };
    fetchUserData(user_id);
    if (isSummitSuccessful) {
      setIsSummitSuccessful(false);
    }
  }, [user_id, isSummitSuccessful]);

  const handleResetPassword = () => {
    console.log("reset password");
  };

  const handleUserChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateUserSubmit = async (event) => {
    event.preventDefault();
    const insertData = new FormData();
    insertData.append("avatar", selectedFile);
    insertData.append("username", userData.username);
    insertData.append("user_id", user_id);
    insertData.append("email", userData.email);
    await request
      .put("/api/user", insertData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      })
      .then((res) => {
        console.log(res.data);
        setSelectedFile(null);
        setIsSummitSuccessful(true);
        setAlertVariant("success");
        setAlertMessage("Cập nhật tài khoản thành công");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      })
      .catch((err) => {
        setAlertVariant("error");
        setAlertMessage("Cập nhật tài khoản thất bại");
        setShowAlert(true);
        console.log(err);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      });
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleConfirmDeleteAccount = async () => {
    // delete user
    try {
      await request.delete(`/api/user/${user_id}`).then((res) => {
        setAlertMessage(res.data.mes);
        setAlertVariant("success");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        logout();
      });
    } catch (error) {
      setAlertMessage("Error deleting user. Please try again.");
      setShowAlert(true);
      setAlertVariant("error");
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div className="container d-flex justify-content-center bg-light shadow-sm p-4 me-3 mb-5">
      {showAlert && (
        <AlertComponent message={alertMessage} variant={alertVariant} />
      )}
      <div className="col col-9">
        {/* <button onClick={handleCheck}>Check</button> */}
        <form onSubmit={handleUpdateUserSubmit}>
          <div className="row justify-content-between shadow p-3 mb-3">
            <div
              className="col justify-content-center p-3 mb-3 d-flex flex-column"
              style={{ alignItems: "center" }}
            >
              <img
                src={
                  userData.avatar
                    ? userData.avatar
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />

              <button
                type="button"
                className="btn btn-success mt-2 btn-sm"
                style={{ width: "110px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalChooseAvatar"
              >
                Thay avatar
              </button>
              {selectedFile && (
                <p className="mt-1">
                  New avatar file: {selectedFile.name} <br />{" "}
                  <strong>Click Cập nhật để đổi avatar</strong>
                </p>
              )}
              {/* 1.modal avatar */}
              <div className="modal fade " id="modalChooseAvatar">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title fw-bold">
                        Chọn avatar của bạn
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        data-bs-target="#modalChooseAvatar"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="avatar" className="form-label fw-bold">
                          Avatar
                        </label>
                        <input
                          type="file"
                          className="form-select"
                          onChange={onFileChange}
                          name="avatar"
                          id="avatar"
                        />
                        <button
                          type="button"
                          className="btn btn-primary text-center mt-3"
                          data-bs-dismiss="modal"
                        >
                          Chọn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="ms-3 fw-bold">THÔNG TIN TÀI KHOẢN</h4>
            <div className="col-5">
              <div>
                <label htmlFor="username" className="form-label mt-3">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleUserChange}
                  className="form-control form-control-sm"
                  value={userData.username}
                  required
                />
              </div>
            </div>
            <div className="col-5">
              <div>
                <label htmlFor="role_code" className="form-label mt-3">
                  Role
                </label>
                <input
                  type="text"
                  name="role_code"
                  id="role_code"
                  className="form-control form-control-sm"
                  value={
                    userData.role_code === "R1"
                      ? "Admin"
                      : userData.role_code === "R2"
                      ? "Nhà tuyển dụng"
                      : "Ứng viên"
                  }
                  disabled
                />
              </div>
            </div>
            <div className="col-5">
              <div>
                <label htmlFor="email" className="form-label mt-3">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleUserChange}
                  className="form-control form-control-sm"
                  value={userData.email}
                  required
                />
              </div>
            </div>
            <div className="col-5">
              <div>
                <label className="form-label mt-3">Password</label>
                <br />
                <div className="text-start">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning"
                    onClick={handleResetPassword}
                  >
                    Reset password
                  </button>
                </div>
              </div>
            </div>
            <div className="col-5 mt-4 text-end">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{ width: "160px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalConfirmDelete"
              >
                Xóa tài khoản
              </button>
              {/* 2.modal confirm delete */}

              <div className="modal fade" id="modalConfirmDelete">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title fw-bold">Confirm Delete</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        data-bs-target="#modalConfirmDelete"
                      ></button>
                    </div>
                    <div className="modal-body text-center">
                      Are you sure you want to delete this account?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        data-bs-target="#modalConfirmDelete"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleConfirmDeleteAccount}
                        data-bs-dismiss="modal"
                        data-bs-target="#modalConfirmDelete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-5 mt-4 ">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                style={{ width: "160px" }}
              >
                Cập nhật tài khoản
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountAdmin;
