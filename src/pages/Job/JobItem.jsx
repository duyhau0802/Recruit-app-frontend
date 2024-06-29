import { Link } from "react-router-dom";
import { useState } from "react";
import request from "../../configs/request.js";
import formatDay from "../../utils/formatDay.js";
import AlertComponent from "../../components/AlertComponent.jsx";
function JobItem({ job }) {
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

  let jobTitle = job.vi_tri;
  let jobCompany = job.employerData?.ten_cong_ty;
  let jobSalary = job.salaryData?.value;
  let jobLocation = job.provinceData.value;
  let logoCompany = job.employerData.logo_cong_ty;
  let jobDeadline = job.deadline;
  const id_user = localStorage.getItem("user_id");
  // const [savedJobs, setSavedJobs] = useState([]);
  let isSaved = false;
  // useEffect(() => {
  //   request.get(`api/saved-job/${id_user}`).then((res) => {
  //     setSavedJobs(res.data);
  //   });
  // }, [id_user, isSaved]);
  // if (savedJobs.some((savedJob) => savedJob.id === job.id)) {
  //   isSaved = true;
  // }

  const addToFavorite = () => {
    // if (!isSaved) {
    request.post("api/saved-job", { id_tin: job.id, id_user }).then((res) => {
      if (res.data === "You already saved!")
        handleAlert("error", "You already saved this job!");
      else handleAlert("success", "Đã lưu tin tuyển dụng");
    });
    // }
  };

  return (
    <div className="d-flex job-item border mb-3 p-2">
      {showAlert && (
        <AlertComponent variant={alertVariant} message={alertMessage} />
      )}
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
        <Link
          className="text-decoration-none text-black"
          to={"/job/" + job.id}
          onClick={() => window.scrollTo(0, 0)}
        >
          <h5 className="h5 mb-1">{jobTitle}</h5>
        </Link>
        <div className="text-muted mb-1">
          <Link
            to={"/employer/" + job.employerData.id}
            className="text-decoration-none"
          >
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
        <button onClick={addToFavorite} className="btn btn-success btn-sm">
          {isSaved ? "Saved" : "Save Job"}
        </button>
      </div>
    </div>
  );
}

export default JobItem;
