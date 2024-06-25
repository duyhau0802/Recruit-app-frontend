import React, { useState, useEffect } from "react";
import request from "../../configs/request.js";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDay from "../../utils/formatDay";
import AlertComponent from "../../components/AlertComponent.jsx";

const UpdateAccountApplicant = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [isSummitSuccessful, setIsSummitSuccessful] = useState(false);

  const user_id = localStorage.getItem("user_id");
  const [startDate, setStartDate] = useState(new Date());
  // fetch applicant data

  const [dataJobType, setDataJobType] = useState([]);
  const [dataSalary, setDataSalary] = useState([]);
  const [dataJobField, setDataJobField] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataDegree, setDataDegree] = useState([]);
  // fetch data job_type, degree,...
  useEffect(() => {
    const fetchJobType = async () => {
      await request
        .get("/api/job-type")
        .then((res) => {
          setDataJobType(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
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
    const fetchSalaryData = async () => {
      await request
        .get("/api/salary")
        .then((res) => {
          setDataSalary(res.data);
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
    const fetchDegree = async () => {
      await request
        .get("/api/degree")
        .then((res) => {
          setDataDegree(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchDegree();
    fetchJobType();
    fetchProvinceData();
    fetchSalaryData();
    fetchJobField();
  }, []);
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
    const fetchApplicantData = async (user_id) => {
      request
        .get(`/api/applicant/${user_id}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.log("Error fetching applicant data", err);
        });
    };
    fetchApplicantData(user_id);
    fetchUserData(user_id);
    if (isSummitSuccessful) {
      setIsSummitSuccessful(false);
    }
  }, [user_id, isSummitSuccessful]);

  // fetch applicant data
  const [formData, setFormData] = useState({
    gioi_tinh: "",
    ngay_sinh: "",
    dia_chi: "",
    province_code: "",
    sdt: "",
    // Kinh nghiem thuc te
    bang_cap_code: "",
    kinh_nghiem: "",
    ky_nang: "",
    // mong muon
    desire_job_field: "",
    desire_province: "",
    desire_job_type: "",
    desire_salary: "",
  });

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
          email: userData.email,
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

  const handleUpdateApplicantSubmit = async (event) => {
    event.preventDefault();
    await request
      .put(`/api/applicant/${user_id}`, formData)
      .then((res) => {
        console.log(res.data);
        setIsSummitSuccessful(true);
        setAlertMessage("Cập nhật thông tin chi tiết");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setAlertMessage("Xảy ra lỗi khi cập nhật thông tin chi tiết.");
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
      <div className="col col-9">
        {/* <button onClick={handleCheck}>Check</button> */}
        <form onSubmit={handleUpdateUserSubmit}>
          <div className="row-12 justify-content-between shadow p-3 mb-3">
            <h4 className="ms-3 fw-bold">THÔNG TIN TÀI KHOẢN</h4>
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
        <form onSubmit={handleUpdateApplicantSubmit}>
          <div className="row justify-content-between shadow p-3">
            <h4 className="mt-4 mb-2 ms-3 fw-bold">THÔNG TIN CHI TIẾT</h4>
            <div className="col-5">
              <div>
                <label htmlFor="gioi_tinh" className="form-label mt-3">
                  Giới tính
                </label>
                <select
                  type="text"
                  name="gioi_tinh"
                  id="gioi_tinh"
                  onChange={handleChange}
                  className="form-select form-select-sm"
                  value={formData?.gioi_tinh ? formData.gioi_tinh : "Nam"}
                >
                  <option value="Nam"> Nam</option>
                  <option value="Nữ"> Nữ</option>
                </select>
              </div>
              <div>
                <label htmlFor="dia_chi" className="form-label mt-3">
                  Địa chỉ
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  id="dia_chi"
                  name="dia_chi"
                  onChange={handleChange}
                  value={formData?.dia_chi ? formData.dia_chi : ""}
                />
              </div>
              <div>
                <label htmlFor="sdt" className="form-label mt-3">
                  Số điện thoại
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="sdt"
                  name="sdt"
                  className="form-control form-control-sm"
                  value={formData?.sdt}
                />
              </div>
            </div>
            <div className="col-5">
              <div>
                <label htmlFor="ngay_sinh" className="form-label mt-3">
                  Ngày sinh
                </label>
                <DatePicker
                  selected={startDate}
                  id="ngay_sinh"
                  className="form-control form-control-sm"
                  onChange={(date) => {
                    setStartDate(date);
                    handleChange({
                      target: { name: "ngay_sinh", value: formatDay(date) },
                    });
                  }}
                />
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
                  value={formData?.province_code}
                >
                  {dataProvince.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h4 className="mt-4 mb-2 ms-3 fw-bold">Kinh nghiệm, kỹ năng</h4>
            <div className="col-12  h-100">
              <label htmlFor="ky_nang" className="form-label mt-3 ">
                Kỹ năng
              </label>
              <textarea
                onChange={handleChange}
                className="form-control"
                name="ky_nang"
                id="ky_nang"
                value={formData?.ky_nang}
                placeholder="VD: 
                - Kỹ năng văn phòng : word , kỹ năng mềm "
              ></textarea>
            </div>

            <div className="row justify-content-between">
              <div className="col-5">
                <div>
                  <label htmlFor="bang_cap_code" className="form-label mt-3">
                    Bằng cấp
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="bang_cap_code"
                    name="bang_cap_code"
                    onChange={handleChange}
                    value={formData?.bang_cap_code}
                  >
                    {dataDegree.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-5">
                <div>
                  <label htmlFor="kinh_nghiem" className="form-label mt-3">
                    Kinh nghiệm
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="kinh_nghiem"
                    name="kinh_nghiem"
                    value={formData?.kinh_nghiem}
                    onChange={handleChange}
                  >
                    <option value="0"> Chưa có kinh nghiệm </option>
                    <option value="1"> Có 1 năm kinh nghiệm </option>
                    <option value="2"> Có 2 năm kinh nghiệm </option>
                    <option value="3"> Có trên 3 năm kinh nghiệm </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row justify-content-between">
              <h4 className="mt-4 mb-2 ms-3 fw-bold">Nguyện vọng</h4>
              <div className="col-5">
                <div>
                  <label htmlFor="desire_job_field" className="form-label mt-3">
                    Lĩnh vực mong muốn
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="desire_job_field"
                    name="desire_job_field"
                    onChange={handleChange}
                    value={formData?.desire_job_field}
                  >
                    {dataJobField.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="desire_job_type" className="form-label mt-3">
                    Loại việc làm
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="desire_job_type"
                    name="desire_job_type"
                    onChange={handleChange}
                    value={formData?.desire_job_type}
                  >
                    {dataJobType.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-5">
                <div>
                  <label htmlFor="desire_province" className="form-label mt-3">
                    Địa điểm mong muốn
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="desire_province"
                    name="desire_province"
                    onChange={handleChange}
                    value={formData?.desire_province}
                  >
                    {dataProvince.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="desire_salary" className="form-label mt-3">
                    Lương mong muốn
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="desire_salary"
                    name="desire_salary"
                    onChange={handleChange}
                    value={formData?.desire_salary}
                  >
                    {dataSalary.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary mb-2">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountApplicant;
