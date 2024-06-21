import React, { useEffect, useState } from "react";
import request from "../../configs/request";
import { Link, useParams } from "react-router-dom";
import formatDay from "../../utils/formatDay";

const JobDetail = () => {
  const [job, setJob] = useState({});
  const { id } = useParams();
  useEffect(() => {
    request.get(`/api/job/${id}`).then((res) => {
      setJob(res.data);
    });
  }, [id]);
  const handleApply = (job_id) => {
    const data = {
      user_id: localStorage.getItem("user_id"),
      job_id: job_id,
    };
    request.post(`/api/application/${job_id}`, data).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <div className="container d-flex">
        <div className="col w-100">
          <div className="row">
            <div className="">
              <img
                src={"/images/Recruit_App/banner_doc_quyen.png"}
                style={{ height: "170px", width: "100%", objectFit: "cover" }}
                alt="banner_img"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="row shadow mt-3 p-3">
            <h3>Thông tin tổng quan</h3>
            <div className="col-2">
              <img
                src={
                  !job.employerData?.logo_cong_ty &&
                  "https://timviec.com.vn/default/images/logo_company_80x80.png"
                }
                alt="logo cong ty"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div className="col">
              <div className="row fw-bold">Vị trí : {job?.vi_tri}</div>
              <div className="row">
                Tên công ty : {job?.employerData?.ten_cong_ty}
              </div>
              <div className="row">Khu vực : {job?.provinceData?.value}</div>
              <div className="row">Mức lương : {job?.salaryData?.value}</div>
            </div>
            <div className="col">
              <div className="">
                <button
                  className="btn btn-primary btn-sm me-4"
                  // onClick={() => handleApply(job?.id)}
                  data-bs-toggle="modal"
                  data-bs-target="#modalApply"
                >
                  Ứng tuyển
                </button>
                <div className="modal fade" id="modalApply">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-bold">Chọn cv của bạn</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          data-bs-target="#modalApply"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="name">Tên</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Nhập tên"
                          />
                        </div>
                      </div>
                      <div className="modal-footer"></div>
                    </div>
                  </div>
                </div>
                <Link className="btn btn-success btn-sm">Ưa thích</Link>
                <div className="row mt-3">
                  Hạn nộp : {formatDay(job.deadline)}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-3 shadow p-3">
            <div className="col w-100">
              <h3>Thông tin chi tiết</h3>
              <div className="row">
                <div className="col">Số lượng tuyển : {job.so_luong} người</div>
                <div className="col">
                  Hình thức làm việc : {job.jobTypeData?.value}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Địa chỉ làm việc : {job?.address_cong_viec}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Ngành nghề : {job.jobFieldData?.value}
                </div>
                <div className="col">
                  Ngày đăng tuyển : {formatDay(job.createdAt)}
                </div>
              </div>
            </div>
          </div>
          <div className={job.mo_ta ? `row mt-1 mb-3 shadow p-3` : `d-none`}>
            <div className="">
              <h3>Mô tả công việc</h3>
              <div className="row ">
                <div className="col" style={{ whiteSpace: "pre-line" }}>
                  {job.mo_ta}
                </div>
              </div>
            </div>
          </div>
          <div
            className={job.quyen_loi ? `row mt-1 mb-3 shadow p-3` : `d-none`}
          >
            <div className="">
              <h3>Quyền lợi được hưởng</h3>
              <div className="row">
                <div className="col" style={{ whiteSpace: "pre-line" }}>
                  {job.quyen_loi}
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              job.yeu_cau_cong_viec ? `row mt-1 mb-3 shadow p-3` : `d-none`
            }
          >
            <div className="">
              <h3>Yêu cầu công việc</h3>
              <div className="row">
                <div className="col" style={{ whiteSpace: "pre-line" }}>
                  {job.yeu_cau_cong_viec}
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              job.yeu_cau_ho_so ? `row mt-1 mb-3 shadow p-3` : `d-none`
            }
          >
            <div className="">
              <h3>Yêu cầu hồ sơ</h3>
              <div className="row">
                <div className="col" style={{ whiteSpace: "pre-line" }}>
                  {job.yeu_cau_ho_so}
                </div>
              </div>
            </div>
          </div>
          <div className={`row mt-1 mb-4 shadow p-3`}>
            <div className="">
              <h3>Sugesstion jobs</h3>
              <div className="row">
                <button className="btn btn-primary">
                  Generate relative jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
