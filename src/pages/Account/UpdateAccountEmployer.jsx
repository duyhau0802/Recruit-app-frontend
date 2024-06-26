import React, { useState, useEffect } from "react";
import request from "../../configs/request.js";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDay from "../../utils/formatDay";
import AlertComponent from "../../components/AlertComponent.jsx";

const UpdateAccountEmployer = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [isSummitSuccessful, setIsSummitSuccessful] = useState(false);

  const user_id = localStorage.getItem("user_id");
  const [startDate, setStartDate] = useState(new Date());

  const [dataJobField, setDataJobField] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  // fetch data province, jobfield,...
  useEffect(() => {
    const fetchProvinceData = async () => {
      await request
        .get("/api/province")
        .then((res) => {
          setDataProvince(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fetchJobField = async () => {
      await request
        .get("/api/job-field")
        .then((res) => {
          setDataJobField(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchProvinceData();
    fetchJobField();
  }, []);
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

  // fetch Employer data
  const [formData, setFormData] = useState({
    ten_cong_ty: "",
    address_cong_ty: "", //
    province_code: "", // giu nguyen
    sdt_cong_ty: "", // giu nguyen

    quy_mo_cong_ty: "", // co nen xoa ko ?
    mo_ta_cong_ty: "",
    job_fields_code: "",

    website: "",
    logo_cong_ty: "",
  });
  const fetchEmployerData = async (user_id) => {
    request
      .get(`/api/employer/${user_id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching employer data", err);
      });
  };
  useEffect(() => {
    fetchEmployerData(user_id);
    fetchUserData(user_id);
    if (isSummitSuccessful) {
      setIsSummitSuccessful(false);
    }
  }, [user_id, isSummitSuccessful]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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

  const handleUpdateLogoSubmit = async (event) => {
    event.preventDefault();
    const insertData = new FormData();
    insertData.append("logo_cong_ty", selectedFile);
    await request
      .put(`/api/employer/update-logo-cong-ty/${user_id}`, insertData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSelectedFile(null);
        setIsSummitSuccessful(true);
        handleAlert("success", "Cập nhật logo cong ty thành công");
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

  const handleUpdateEmployerSubmit = async (event) => {
    event.preventDefault();
    await request
      .put(`/api/employer/${user_id}`, formData)
      .then((res) => {
        console.log(res.data);
        setIsSummitSuccessful(true);
        setAlertMessage("Cập nhật thông tin nhà tuyển dụng thành công");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setAlertMessage("Xảy ra lỗi khi cập nhật thông tin employer.");
        setShowAlert(true);
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

  const handleCheck = (e) => {
    console.log(userData);
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
      {/* 1.modal logo cong ty */}
      <div className="modal fade " id="modalChooseLogo">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Chọn logo công ty</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                data-bs-target="#modalChooseLogo"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group d-flex flex-column">
                <label htmlFor="logo_cong_ty" className="form-label fw-bold">
                  Logo
                </label>
                <input
                  type="file"
                  className="form-select"
                  onChange={onFileChange}
                  name="logo_cong_ty"
                  id="logo_cong_ty"
                />
                <button
                  type="button"
                  className="btn btn-primary text-center mt-3"
                  data-bs-dismiss="modal"
                  onClick={handleUpdateLogoSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-9">
        {/* <button onClick={handleCheck}>Check</button> */}
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
        </form>
        <form onSubmit={handleUpdateEmployerSubmit}>
          <div className="row justify-content-between shadow p-3">
            <h4 className="mt-4 mb-2 ms-3 fw-bold">THÔNG TIN NHÀ TUYỂN DỤNG</h4>
            <div
              className="col-12 justify-content-center p-3 mb-3 d-flex flex-column"
              style={{ alignItems: "center" }}
            >
              <img
                src={
                  formData.logo_cong_ty
                    ? formData.logo_cong_ty
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="logo_cong_ty"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />

              <button
                type="button"
                className="btn btn-warning mt-2 btn-sm"
                style={{ width: "120px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalChooseLogo"
              >
                Đổi logo công ty
              </button>
            </div>
            <div className="col-5">
              <div>
                <label htmlFor="ten_cong_ty" className="form-label mt-1">
                  Tên công ty
                </label>
                <input
                  type="text"
                  name="ten_cong_ty"
                  id="ten_cong_ty"
                  onChange={handleChange}
                  className="form-control form-control-sm"
                  value={formData?.ten_cong_ty ? formData.ten_cong_ty : ""}
                />
              </div>
              <div>
                <label htmlFor="address_cong_ty" className="form-label mt-3">
                  Địa chỉ
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  id="address_cong_ty"
                  name="address_cong_ty"
                  onChange={handleChange}
                  value={
                    formData?.address_cong_ty ? formData.address_cong_ty : ""
                  }
                />
              </div>
              <div>
                <label htmlFor="sdt_cong_ty" className="form-label mt-3">
                  Số điện thoại
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="sdt_cong_ty"
                  name="sdt_cong_ty"
                  className="form-control form-control-sm"
                  value={formData?.sdt_cong_ty ? formData.sdt_cong_ty : ""}
                />
              </div>
            </div>
            <div className="col-5">
              <div>
                <label htmlFor="quy_mo_cong_ty" className="form-label mt-1">
                  Quy mô công ty
                </label>
                <div className="input-group input-group-sm">
                  <input
                    type="number"
                    id="quy_mo_cong_ty"
                    name="quy_mo_cong_ty"
                    className="form-control form-control-sm"
                    onChange={handleChange}
                  />
                  <span className="input-group-text">người</span>
                </div>
              </div>
              <div>
                <label htmlFor="province_code" className="form-label mt-3">
                  Tỉnh thành
                </label>
                <select
                  className="form-select form-select-sm"
                  id="province_code"
                  name="province_code"
                  onChange={handleChange}
                  value={
                    formData?.province_code ? formData.province_code : "HN"
                  }
                >
                  {dataProvince.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="job_fields_code" className="form-label mt-3">
                  Lĩnh vực hoạt động
                </label>
                <select
                  className="form-select form-select-sm"
                  id="job_fields_code"
                  name="job_fields_code"
                  onChange={handleChange}
                  value={
                    formData?.job_fields_code ? formData.job_fields_code : "IT"
                  }
                >
                  {dataJobField.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12">
              <div>
                <label htmlFor="website" className="form-label mt-3">
                  Link website
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="website"
                  name="website"
                  className="form-control form-control-sm"
                  value={formData?.website ? formData.website : ""}
                />
              </div>
              <div>
                <label htmlFor="mo_ta_cong_ty" className="form-label mt-3">
                  Mô tả công ty
                </label>
                <textarea
                  name="mo_ta_cong_ty"
                  className="form-control"
                  style={{ height: "200px" }}
                  id=""
                  onChange={handleChange}
                  placeholder="VD:
                  - Công ty có các ưu đãi : ... ,
                  - Công ty có những hoạt động : ... "
                  value={formData?.mo_ta_cong_ty ? formData.mo_ta_cong_ty : ""}
                ></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-primary mb-2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountEmployer;
