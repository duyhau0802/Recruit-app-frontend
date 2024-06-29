import request from "../../configs/request.js";
import { useEffect, useState, useRef } from "react";
import JobItem from "./JobItem.jsx";
import ReactPaginate from "react-paginate";

function Home() {
  // pagination
  const [totalPages, setTotalPages] = useState(0);
  const bodyRef = useRef(null);

  const fetchJobData = async (
    page = 1,
    name = "",
    province_cong_viec = "",
    salary_code = "",
    job_type_code = "",
    job_field_code = "",
    degree_code = ""
  ) => {
    let urlRequest = `/api/job?page=${page}&limit=7&order[]=createdAt&order[]=DESC`;
    if (name) urlRequest += `&name=${name}`;
    if (province_cong_viec)
      urlRequest += `&province_cong_viec=${province_cong_viec}`;
    if (salary_code) urlRequest += `&salary_code=${salary_code}`;
    if (job_type_code) urlRequest += `&job_type_code=${job_type_code}`;
    if (job_field_code) urlRequest += `&job_field_code=${job_field_code}`;
    if (degree_code) urlRequest += `&degree_code=${degree_code}`;
    await request
      .get(urlRequest)
      .then((res) => {
        setDataJobs(res.data.jobData.rows);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageClick = (event) => {
    fetchJobData(
      +event.selected + 1,
      formData.name,
      formData.province_cong_viec,
      formData.salary_code,
      formData.job_type_code,
      formData.job_field_code,
      formData.degree_code
    );
  };

  const [dataJobs, setDataJobs] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataSalary, setDataSalary] = useState([]);
  const [dataJobType, setDataJobType] = useState([]);
  const [dataJobField, setDataJobField] = useState([]);
  const [dataDegree, setDataDegree] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    province_cong_viec: "",
    salary_code: "",
    job_type_code: "",
    job_field_code: "",
    degree_code: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
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
    fetchJobType();
    fetchJobField();
    fetchDegree();
  }, []);

  const timKiem = (event) => {
    event.preventDefault();
    fetchJobData(
      1,
      formData.name,
      formData.province_cong_viec,
      formData.salary_code,
      formData.job_type_code,
      formData.job_field_code,
      formData.degree_code
    );
    bodyRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className="container-theme"
      style={{
        padding: "24px auto",
        alignItems: "center",
        // backgroundColor: "grey",
      }}
    >
      <div
        className="container shadow pb-2"
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "25px",
        }}
      >
        {/* search form */}
        <div className="row">
          <h2 className="mb-3">Tìm việc làm nhanh</h2>
          <form onSubmit={timKiem}>
            <div className="col-12">
              <div className="row">
                <div className="col">
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
                      <option value=""></option>
                      {dataProvince.map((provinces, index) => (
                        <option key={index} value={provinces.code}>
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
                      <option value=""></option>
                      {dataSalary.map((salary, index) => (
                        <option key={index} value={salary.code}>
                          {salary.value}
                        </option>
                      ))}
                    </select>
                    <button className="btn btn-primary ms-3" type="submit">
                      Tìm kiếm
                    </button> 
                    <button
                      type="button"
                      className="btn btn-warning btn-sm ms-3"
                      data-bs-toggle="collapse"
                      data-bs-target="#myCollapse"
                      aria-expanded={false}
                      aria-controls="myCollapse"
                    >
                      Advance
                    </button>
                  </div>
                </div>
              </div>
              {/* advance search */}
              <div className="row-col-12 collapse" id="myCollapse">
                <div className="input-group mb-3">
                  <span className="input-group-text ms-3">Job type</span>
                  <select
                    className="form-select form-select-sm"
                    id="job_type_code"
                    name="job_type_code"
                    onChange={handleChange}
                    value={formData?.job_type_code}
                  >
                    <option value=""></option>
                    {dataJobType.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <span className="input-group-text ms-3">Job field</span>
                  <select
                    className="form-select form-select-sm"
                    id="job_field_code"
                    name="job_field_code"
                    onChange={handleChange}
                    value={formData?.job_field_code}
                  >
                    <option value=""></option>
                    {dataJobField.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <span className="input-group-text ms-3">Degree</span>
                  <select
                    className="form-select form-select-sm"
                    id="degree_code"
                    name="degree_code"
                    onChange={handleChange}
                    value={formData?.degree_code}
                  >
                    <option value=""></option>
                    {dataDegree.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* banner */}
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
        {/* jobs */}
        <div className="row" id="jobs" ref={bodyRef}>
          <div className="col" style={{ minHeight: "500px" }}>
            <h2 className="mb-4">Các công việc mới nhất</h2>
            <div>
              {dataJobs.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
            </div>
          </div>
        </div>
        {/* pagination */}
        <div className="jobs-pagation d-flex justify-content-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
