import request from "../../configs/request.js";
import { useEffect, useState } from "react";
import JobItem from "./JobItem.jsx";
import ReactPaginate from "react-paginate";

function Home() {
  // pagination
  const [totalPages, setTotalPages] = useState(0);

  const fetchJobData = async (
    page = 1,
    name = "",
    province_cong_viec = "",
    salary_code = ""
  ) => {
    let urlRequest = `/api/job?page=${page}&limit=7&order[]=createdAt&order[]=DESC`;
    if (name) urlRequest += `&name=${name}`;
    if (province_cong_viec)
      urlRequest += `&province_cong_viec=${province_cong_viec}`;
    if (salary_code) urlRequest += `&salary_code=${salary_code}`;
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
      formData.salary_code
    );
  };

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

  const timKiem = (event) => {
    event.preventDefault();
    fetchJobData(
      1,
      formData.name,
      formData.province_cong_viec,
      formData.salary_code
    );
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
        <div className="row">
          <h2 className="mb-3">Tìm việc làm nhanh</h2>
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
                <option value="">Tất cả</option>
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
                <option value="">Tất cả</option>
                {dataSalary.map((salary, index) => (
                  <option key={index} value={salary.code}>
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
