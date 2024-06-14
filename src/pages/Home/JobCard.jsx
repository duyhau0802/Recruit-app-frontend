import "./JobCard.css";
const JobCard = (props) => {
  return (
    <div className="container">
      <div className="job-container row ms-auto d-flex align-items-center">
        <div className="col-2">
          <div className="card-left ms-0">
            <img
              src="./images/placeholder.png"
              className="card-img"
              style={{ width: "100%", height: "100%" }}
              alt="..."
            />
          </div>
        </div>
        <div className="col">
          <div className="card mb-3" style={{ width: "100%", height: "100%" }}>
            <div className="card-body">
              <div className="card-right">
                <h5 className="card-title">{props.jobTitle}</h5>
                <span className="card-subtitle">{props.jobCompany}</span>
                <p className="card-text">{props.jobSalary}</p>
                <p className="card-text">{props.jobLocation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
