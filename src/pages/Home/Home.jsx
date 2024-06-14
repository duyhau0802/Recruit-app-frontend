import JobCard from "./JobCard.jsx";
import "./Home.css";
function Home() {
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
          <div className="col">
            <div className="banner card" style={{ color: "white" }}>
              <img
                src={"./images/banner.png"}
                className="banner-image card-image"
                alt="banner_img"
                style={{ width: "100%", height: "300px" }}
              />
              <div className="banner-content card-body card-img-overlay">
                <h2 className="card-title">Việc làm tốt nhất </h2>
                <span className="card-subtitle">Tìm kiếm công việc mơ ước</span>
                <div className="card-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quod, quibusdam.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="job-container-header">Xem tất cả : page 1, page 2</div>
        <div className="job-filter">Đây là thanh tìm kiếm</div>
        <div className="job-list card p-4">
          <h2 className="mb-4">Các công việc mới nhất</h2>
          <div className="row">
            {jobs.map((job) => (
              <JobCard
                jobTitle={job.jobTitle}
                jobDescription={job.jobDescription}
                jobCompany={job.jobCompany}
                jobSalary={job.jobSalary}
                jobLocation={job.jobLocation}
              />
            ))}
          </div>
        </div>
        <div className="jobs-pagation">Đây là phần phân trang</div>
      </div>
    </div>
  );
}

export default Home;
