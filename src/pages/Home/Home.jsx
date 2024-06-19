import request from "../../configs/request.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobItem from "./JobItem.jsx";
function Home() {
  const [dataJobs, setDataJobs] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataSalary, setDataSalary] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    province_cong_viec: "",
    salary_code: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    const fetchJobData = async () => {
      await request
        .get("/api/job")
        .then((res) => {
          setDataJobs(res.data.jobData.rows);
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
    fetchJobData();
    fetchProvinceData();
    fetchSalaryData();
  }, []);
  const timKiem = () => {
    console.log(formData);
  };
  return (
    <div
      className="container-theme"
      style={{
        padding: "24px auto",
        alignItems: "center",
        backgroundColor: "grey",
      }}
    >
      <div
        className="container"
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "25px",
        }}
      >
        <div className="row">
          <h4>Tìm việc làm nhanh</h4>
          <form onSubmit={timKiem}>
            <div className="input-group mb-3">
              <span className="input-group-text">Việc làm</span>
              <input
                type="text"
                className="form-control"
                placeholder="lập trình viên"
                id="name"
                name="name"
                onChange={handleChange}
              />
              <span className="input-group-text ms-3">Địa điểm</span>
              <select
                className="form-select"
                name="province_cong_viec"
                onChange={handleChange}
              >
                <option value="0">Tất cả</option>
                {dataProvince.map((provinces, index) => (
                  <option key={index} value={index + 1}>
                    {provinces.value}
                  </option>
                ))}
              </select>
              <span className="input-group-text ms-3">Lương</span>
              <select
                className="form-select"
                name="salary_code"
                onChange={handleChange}
              >
                {dataSalary.map((salary, index) => (
                  <option key={index} value={index + 1}>
                    {salary.value}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary ms-3" type="submit">
                Tìm kiếm
              </button>
              <div className="input-group mb-3"></div>
            </div>
          </form>
        </div>
        <div className="row mb-5">
          <div className="col">
            <div className="">
              <img
                src={"/images/Recruit_App/banner_doc_quyen.png"}
                style={{ height: "170px", width: "100%", objectFit: "cover" }}
                alt="banner_img"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="mb-4">Các công việc mới nhất</h2>
            <div>
              {dataJobs.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
            </div>
          </div>
        </div>
        <div className="jobs-pagation d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <Link className="page-link" href="#">
                Previous
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href="#">
                1
              </Link>
            </li>
            <li className="page-item active">
              <Link className="page-link" href="#">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href="#">
                3
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href="#">
                Next
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
