import React, { useEffect } from "react";
import { useState } from "react";
import request from "../../configs/request";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import AlertComponent from "../../components/AlertComponent.jsx";

const UpdateJob = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const handleAlert = (variant, mes) => {
    setAlertMessage(mes);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    request
      .get(`/api/job/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  }, [id]);

  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const formatDay = (unformattedDate) => {
    const dateObject = new Date(unformattedDate);
    // Extract components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; //getMonth() returns 0-based index
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    // Format the date for MySQL
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedDate;
  };

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const [dataJobType, setDataJobType] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataSalary, setDataSalary] = useState([]);
  const [dataJobField, setDataJobField] = useState([]);
  const [dataDegree, setDataDegree] = useState([]);
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
  const handleSubmit = (event) => {
    event.preventDefault();
    request
      .put(`/api/job/${id}`, formData)
      .then((res) => {
        if (res.data[0] === 1) {
          handleAlert("success", "Cập nhật công việc thành công");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          handleAlert("error", "Cập nhật công việc thất bại");
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container d-flex justify-content-center bg-light shadow-sm p-4 me-3 mb-5">
      {showAlert && (
        <AlertComponent variant={alertVariant} message={alertMessage} />
      )}
      <div className="col col-8">
        <form onSubmit={handleSubmit}>
          <h4 className="ms-3 fw-bold">THÔNG TIN CÔNG VIỆC</h4>
          <div>
            <label htmlFor="vi_tri" className="form-label mt-3">
              Vị trí tuyển dụng
            </label>
            <input
              type="text"
              name="vi_tri"
              id="vi_tri"
              onChange={handleChange}
              defaultValue={formData.vi_tri}
              placeholder="VD: nhân viên kinh doanh"
              className="form-control form-control-sm"
              required
            />
          </div>
          <div className="row justify-content-between">
            <div className="col-5">
              <div>
                <label htmlFor="so_luong" className="form-label mt-3">
                  Số lượng
                </label>
                <input
                  type="number"
                  min="1"
                  name="so_luong"
                  id="so_luong"
                  onChange={handleChange}
                  className="form-control form-control-sm"
                  defaultValue={formData.so_luong}
                  required
                />
              </div>
              <div>
                <label htmlFor="job_type_code" className="form-label mt-3">
                  Loại hình công việc
                </label>
                <select
                  className="form-select form-select-sm"
                  id="job_type_code"
                  name="job_type_code"
                  onChange={handleChange}
                  defaultValue={formData.job_type_code}
                  required
                >
                  {dataJobType.map((item, index) => (
                    <option key={index} value={index + 1}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="address_cong_viec" className="form-label mt-3">
                  Địa chỉ
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="address_cong_viec"
                  name="address_cong_viec"
                  defaultValue={formData.address_cong_viec}
                  className="form-control form-control-sm"
                  placeholder="VD: 432 ql 9"
                  required
                />
              </div>
            </div>
            <div className="col-5">
              <div>
                <label htmlFor="salary_code" className="form-label mt-3">
                  Mức lương
                </label>
                <select
                  className="form-select form-select-sm"
                  id="salary_code"
                  name="salary_code"
                  defaultValue={formData.salary_code}
                  onChange={handleChange}
                  required
                >
                  {dataSalary.map((item, index) => (
                    <option key={index} value={index + 1}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="job_field_code" className="form-label mt-3">
                  Ngành nghề
                </label>
                <select
                  className="form-select form-select-sm"
                  id="job_field_code"
                  name="job_field_code"
                  defaultValue={formData.job_field_code}
                  onChange={handleChange}
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
                <label htmlFor="province_cong_viec" className="form-label mt-3">
                  Địa điểm
                </label>
                <select
                  className="form-select form-select-sm"
                  id="province_cong_viec"
                  defaultValue={formData.province_cong_viec}
                  name="province_cong_viec"
                  onChange={handleChange}
                  required
                >
                  {dataProvince.map((item, index) => (
                    <option key={index} value={index + 1}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="mo_ta" className="form-label mt-3 ">
                Mô tả công việc
              </label>
              <textarea
                onChange={handleChange}
                className="form-control h-100"
                defaultValue={formData.mo_ta}
                name="mo_ta"
                id="mo_ta"
                placeholder="VD: 
                - Liên hệ khách hàng
                - Code front end cho trang web
                - Chi tiết trao đổi tại buổi phỏng vấn"
              ></textarea>
            </div>
            <div className="col-12 mt-5 mb-4">
              <label htmlFor="quyen_loi" className="form-label mt-3">
                Quyền lợi được hưởng
              </label>
              <textarea
                onChange={handleChange}
                className="form-control h-100 fs-6"
                name="quyen_loi"
                defaultValue={formData.quyen_loi}
                id="quyen_loi"
                placeholder="VD: 
                - Thời gian làm việc :...
                - Nghỉ phép, du lịch, team building
                - Làm việc trong môi trường trẻ trung"
              ></textarea>
            </div>
            {/* Yeu cau cong viec */}
            <h4 className="mt-5 mb-2 ms-3 fw-bold">Yêu cầu công việc</h4>
            <div>
              <label htmlFor="kinh_nghiem" className="form-label mt-3">
                Kinh nghiệm
              </label>
              <select
                className="form-select form-select-sm"
                id="kinh_nghiem"
                name="kinh_nghiem"
                defaultValue={formData.kinh_nghiem}
                onChange={handleChange}
                required
              >
                <option value="0"> Chưa có kinh nghiệm </option>
                <option value="1"> Có 1 năm kinh nghiệm </option>
                <option value="2"> Có 2 năm kinh nghiệm </option>
                <option value="3"> Có trên 3 năm kinh nghiệm </option>
              </select>
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
                    defaultValue={formData.degree_code}
                    onChange={handleChange}
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
                  <label htmlFor="deadline" className="form-label mt-3">
                    Hạn nộp hồ sơ
                  </label>
                  <DatePicker
                    selected={startDate}
                    id="deadline"
                    defaultValue={formData.deadline}
                    className="form-control form-control-sm"
                    onChange={(date) => {
                      setStartDate(date);
                      handleChange({
                        target: { name: "deadline", value: formatDay(date) },
                      });
                    }}
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="yeu_cau_cong_viec" className="form-label mt-3 ">
                  Yêu cầu công việc
                </label>
                <textarea
                  className="form-control h-100"
                  name="yeu_cau_cong_viec"
                  id="yeu_cau_cong_viec"
                  defaultValue={formData.yeu_cau_cong_viec}
                  onChange={handleChange}
                  placeholder="VD: 
                - Có kinh nghiệm là 1 lợi thế
                - Biết sử dụng kỹ năng văn phòng : word excel
                - Giao tiếp tốt"
                ></textarea>
              </div>
              <div className="col-12 mt-5 mb-4">
                <label htmlFor="yeu_cau_ho_so" className="form-label mt-3">
                  Yêu cầu hồ sơ
                </label>
                <textarea
                  onChange={handleChange}
                  className="form-control h-100"
                  name="yeu_cau_ho_so"
                  id="yeu_cau_ho_so"
                  defaultValue={formData.yeu_cau_ho_so}
                  placeholder="VD: 
                - Đơn xin việc :...
                - Chứng minh nhân dân
                - Giấy khám sức khỏe"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-secondary mt-4 me-3 mt-5"
              onClick={() => navigate(-1)}
            >
              Hủy bỏ
            </button>
            <button type="submit" className="btn btn-primary mt-4 me-5 mt-5">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
