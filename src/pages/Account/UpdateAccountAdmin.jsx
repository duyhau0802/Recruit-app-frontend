import React, { useState, useEffect } from "react";
import request from "../../configs/request.js";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import AlertComponent from "../../components/AlertComponent.jsx";
import axios from "axios";

const UpdateAccountAdmin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [isSummitSuccessful, setIsSummitSuccessful] = useState(false);

  const user_id = localStorage.getItem("user_id");

  // fetch user, employer data
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
    email: "",
  });
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

  useEffect(() => {
    fetchUserData(user_id);
    if (isSummitSuccessful) {
      setIsSummitSuccessful(false);
    }
  }, [user_id, isSummitSuccessful]);

  const handleUserChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await request
        .post("/api/auth/password-reset", {
          email: userData?.email,
        })
        .then((res) => {
          setAlertMessage(res.data.mes);
          setAlertVariant("success");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setAlertMessage("Error resetting password at server");
          setAlertVariant("error");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        });
    } catch (error) {
      setAlertMessage("Error resetting password at client");
      setAlertVariant("error");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const handleAlert = (variant, mes) => {
    setAlertMessage(mes);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleUpdateAvatarSubmit = async (event) => {
    event.preventDefault();
    const insertData = new FormData();
    insertData.append("avatar", selectedFile);
    insertData.append("user_id", user_id);
    await request
      .put("/api/user", insertData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSelectedFile(null);
        setIsSummitSuccessful(true);
        handleAlert("success", "Cập nhật ảnh đại diện thành công");
      });
  };

  const handleUpdateUserSubmit = async (event) => {
    event.preventDefault();
    await request
      .put(`/api/user/${user_id}`, userData)
      .then((res) => {
        console.log(res.data);
        setIsSummitSuccessful(true);
        handleAlert("success", "Cập nhật tài khoản thành công");
      })
      .catch((err) => {
        handleAlert("error", "error handleUpdateUserSubmit");
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
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
      setAlertVariant("error");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const SaveAndUpdateAI = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/saveDataRecommend"
      );
      return response.data.message;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const handleSaveAndUpdateAI = async () => {
    const message = await SaveAndUpdateAI();
    if (message === "Data saved successfully") handleAlert("success", message);
    else handleAlert("error", message);
    console.log(message);
  };

  return (
    <div className="container d-flex justify-content-center bg-light shadow-sm p-4 me-3 mb-5">
      {showAlert && (
        <AlertComponent message={alertMessage} variant={alertVariant} />
      )}
      {/* 1.modal avatar */}
      <div className="modal fade " id="modalChooseAvatar">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Chọn avatar của bạn</h5>
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
                  onClick={handleUpdateAvatarSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-9">
        <form onSubmit={handleUpdateUserSubmit}>
          <div className="row justify-content-between shadow p-3 mb-3">
            <h4 className="ms-3 fw-bold">THÔNG TIN TÀI KHOẢN</h4>
            <div
              className="col-12 justify-content-center p-3 mb-3 d-flex flex-column"
              style={{ alignItems: "center" }}
            >
              <img
                src={
                  userData?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
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
                className="btn btn-warning mt-2 btn-sm"
                style={{ width: "110px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalChooseAvatar"
              >
                Thay avatar
              </button>
            </div>
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
                  value={userData?.username}
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
                    userData?.role_code === "R1"
                      ? "Admin"
                      : userData?.role_code === "R2"
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
                  value={userData?.email}
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
          <div className="row justify-content-between shadow p-3 mb-3">
            <h4 className="ms-3 fw-bold">Lưu và cập nhật AI</h4>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => handleSaveAndUpdateAI()}
            >
              Save and update AI data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountAdmin;
