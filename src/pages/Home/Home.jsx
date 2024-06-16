// import JobCard from "./JobCard.jsx";
import "./Home.css";
import request from "../../configs/request.js";
import { useEffect, useState } from "react";
import JobItem from "./JobItem.jsx";
function Home() {
  const [dataJobs, setDataJobs] = useState([]);
  useEffect(() => {
    request
      .get("/api/job")
      .then((res) => {
        setDataJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(dataJobs);
  }, [dataJobs]);
  const jobs = [
    {
      jobTitle: "Frontend Developer",
      jobDescription: "Mã hóa cho web",
      jobCompany: "Google",
      jobSalary: "1500$/tháng",
      jobLocation: "Hà Nội",
    },
    {
      jobTitle: "Backend Developer",
      jobDescription: "Mã hóa cho web",
      jobCompany: "Amazon",
      jobSalary: "1800$/tháng",
      jobLocation: "Hà Nội",
    },
    {
      jobTitle: "Fullstack Developer",
      jobDescription: "Mã hóa cho web",
      jobCompany: "Facebook",
      jobSalary: "2000$/tháng",
      jobLocation: "Hà Nội",
    },
  ];
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
          <div className="">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Việc làm
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Mã hóa cho web"
                id="jobDescription"
              />
              <span className="input-group-text" id="basic-addon1">
                Địa điểm
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Hà Nội"
                id="location"
              />
              <span className="input-group-text" id="basic-addon1">
                Tiêu chuẩn lương
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="3-5 triệu"
                id="salary"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Tìm kiếm
              </button>
              <div className="input-group mb-3"></div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col">
            <div className="banner card" style={{ color: "white" }}>
              <img
                src={"./images/banner.png"}
                style={{ height: "200px", width: "100%" }}
                alt="banner_img"
              />
              <div className="banner-content card-body card-img-overlay">
                <h3 className="card-title">Việc làm tốt nhất </h3>
                <div className="card-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quod, quibusdam.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="mb-4">Các công việc mới nhất</h2>

            <div>
              {jobs.map((job) => (
                <JobItem key={job.id} job={job} /> // Pass the job object as a prop
              ))}
            </div>
            {/* <div className="job-list card p-4">
              <div className="row">
                {jobs.map((job) => (
                  <JobCard
                    key={job.jobTitle}
                    jobTitle={job.jobTitle}
                    jobDescription={job.jobDescription}
                    jobCompany={job.jobCompany}
                    jobSalary={job.jobSalary}
                    jobLocation={job.jobLocation}
                  />
                ))}
              </div> */}

            {/* </div> */}
          </div>
          {/* <div className="col col-4 mt-2">
            <div className="job-list card p-4">This is ad</div>
          </div> */}
        </div>
        <div className="job-container-header">Xem tất cả : page 1, page 2</div>

        <div className="jobs-pagation">Đây là phần phân trang</div>
      </div>
    </div>
  );
}

export default Home;
