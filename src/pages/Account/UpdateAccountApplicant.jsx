import React, { useState, useEffect } from "react";
import request from "../../configs/request.js";
// import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDay from "../../utils/formatDay";

const UpdateAccountApplicant = () => {
  const userRole = localStorage.getItem("user_role");
  const userId = localStorage.getItem("user_id");
  const [dataProvince, setDataProvince] = useState([]);
  const [dataDegree, setDataDegree] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    email: "",
    gioi_tinh: "Nam",
    ngay_sinh: new Date(),
    dia_chi: "",
    province_code: "HCM",
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
  const [dataJobType, setDataJobType] = useState([]);
  const [dataSalary, setDataSalary] = useState([]);
  const [dataJobField, setDataJobField] = useState([]);
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
  useEffect(() => {
    request
      .get(`/api/user/${userId}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  }, [userId]);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    request
      .put(`/api/user/${userId}`, formData)
      .then((res) => {
        console.log(res);
        alert("Cập nhật tài khoản thành công");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="container d-flex justify-content-center bg-light shadow-sm p-4 me-3 mb-5">
      <div className="col col-8">
        <form onSubmit={handleSubmit}>
          <h4 className="ms-3 fw-bold">THÔNG TIN TÀI KHOẢN</h4>
          <div>
            <label htmlFor="username" className="form-label mt-3">
              Họ và tên
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              className="form-control form-control-sm"
              defaultValue={formData.username}
              required
            />
          </div>
          <div className="row justify-content-between">
            <div className="col-5">
              <div>
                <label htmlFor="email" className="form-label mt-3">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="form-control form-control-sm"
                  defaultValue={formData.email}
                  disabled
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
                  onChange={handleChange}
                  className="form-control form-control-sm"
                  defaultValue={
                    userRole === "R1"
                      ? "Admin"
                      : userRole === "R2"
                      ? "Nhà tuyển dụng"
                      : "Ứng viên"
                  }
                  disabled
                />
              </div>
            </div>
          </div>
          {/* <div className="row justify-content-between">
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
                  className="form-control form-control-sm"
                  defaultValue={formData.gioi_tinh}
                >
                  <option value="0"> Nam</option>
                  <option value="1"> Nữ</option>
                </select>
              </div>
              <div>
                <label htmlFor="dia_chi" className="form-label mt-3">
                  Địa chỉ
                </label>
                <input
                  className="form-select form-select-sm"
                  type="text"
                  id="dia_chi"
                  name="dia_chi"
                  onChange={handleChange}
                  defaultValue={formData.dia_chi}
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
                  defaultValue={formData.sdt}
                  required
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
                  required
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
                  defaultValue={formData.province_code}
                >
                  {dataProvince.map((item, index) => (
                    <option key={index} value={index + 1}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h4 className="mt-4 mb-2 ms-3 fw-bold">Kinh nghiệm, kỹ năng</h4>
            <div className="col-12  h-100">
              <label htmlFor="ki_nang" className="form-label mt-3 ">
                Kỹ năng
              </label>
              <textarea
                onChange={handleChange}
                className="form-control"
                name="ki_nang"
                id="ki_nang"
                placeholder="VD: 
                - Kỹ năng văn phòng : word , kỹ năng mềm "
              ></textarea>
            </div>

            <div className="row justify-content-between">
              <div className="col-5">
                <div>
                  <label htmlFor="degree_code" className="form-label mt-3">
                    Bằng cấp
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="degree_code"
                    name="degree_code"
                    onChange={handleChange}
                    defaultValue={formData.degree_code}
                    required
                  >
                    {dataDegree.map((item, index) => (
                      <option key={index} value={index + 1}>
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
                    onChange={handleChange}
                    required
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
                    defaultValue={formData.desire_job_field}
                    required
                  >
                    {dataJobField.map((item, index) => (
                      <option key={index} value={index + 1}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="desire_job_type" className="form-label mt-3">
                    Hình thức làm mong muốn
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="desire_job_type"
                    name="desire_job_type"
                    onChange={handleChange}
                    defaultValue={formData.desire_job_type}
                    required
                  >
                    {dataJobType.map((item, index) => (
                      <option key={index} value={index + 1}>
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
                    defaultValue={formData.desire_province}
                    required
                  >
                    {dataProvince.map((item, index) => (
                      <option key={index} value={index + 1}>
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
                    defaultValue={formData.desire_salary}
                    required
                  >
                    {dataSalary.map((item, index) => (
                      <option key={index} value={index + 1}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountApplicant;
