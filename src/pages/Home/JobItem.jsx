import { Link } from "react-router-dom";
import formatDay from "../../utils/formatDay.js";

function JobItem({ job }) {
  // const { jobTitle, jobCompany, jobSalary, jobLocation } = job;
  let jobTitle = job.vi_tri;
  let jobCompany = job.employerData.ten_cong_ty;
  let jobSalary = job.salaryData.value;
  let jobLocation = job.provinceData.value;
  let logoCompany = job.employerData.logo_cong_ty;
  let jobDeadline = job.deadline;

  return (
    <div className="d-flex job-item border mb-3 p-2">
      <div className="me-3" style={{ minWidth: "80px" }}>
        <Link className="text-decoration-none" to={"/job/" + job.id}>
          <img
            className="img-fluid rounded"
            alt="..."
            src={
              logoCompany
                ? logoCompany
                : "https://timviec.com.vn/default/images/logo_company_80x80.png"
            }
            style={{ width: "80px", height: "80px" }}
          />
        </Link>
      </div>
      <div className="flex-grow-1">
        <Link className="text-decoration-none text-black" to={"/job/" + job.id}>
          <h5 className="h5 mb-1">{jobTitle}</h5>
        </Link>
        <div className="text-muted mb-1">
          <Link to="#" className="text-decoration-none">
            {jobCompany}
          </Link>
        </div>
        <div className="d-flex mb-2">
          <div className="me-4">
            <span className="text-muted">Lương: </span>
            <span className="font-weight-bold">{jobSalary}</span>
          </div>
          <div className="me-4">
            <span className="text-muted">Khu vực: </span>
            <span className="font-weight-bold">{jobLocation}</span>
          </div>
          <span className="text-muted">Hạn nộp: {formatDay(jobDeadline)}</span>
        </div>
      </div>
      <div className="d-flex align-items-center ">
        <Link className="btn btn-primary btn-sm me-4" to={"/job/" + job.id}>
          Chi tiết
        </Link>
        <Link className="btn btn-success btn-sm">Ưa thích</Link>
      </div>
    </div>
  );
}

export default JobItem;
