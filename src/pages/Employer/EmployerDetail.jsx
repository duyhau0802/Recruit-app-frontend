import React, { useEffect, useState } from "react";
import request from "../../configs/request";
import { useParams } from "react-router-dom";
import JobItem from "../Home/JobItem.jsx";

const EmployerDetail = () => {
  const [employer, setEmployer] = useState({});
  const [dataJobs, setDataJobs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    request.get(`/api/employer/getbyid/${id}`).then((res) => {
      setEmployer(res.data);
    });
    request.get(`/api/job/getbyemployerid/${id}`).then((res) => {
      setDataJobs(res.data);
    });
  }, [id]);
  return (
    <div className="container d-flex mb-4">
      <>
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
            <h3 className="h3 fw-bold mb-4">Thông tin tổng quan</h3>
            <div className="col-2">
              <img
                src={
                  employer?.logo_cong_ty ||
                  "https://timviec.com.vn/default/images/logo_company_80x80.png"
                }
                alt="logo cong ty"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div className="col">
              <div className="row fw-bold">
                Tên công ty : {employer?.ten_cong_ty}
              </div>
              <div className="row">Địa chỉ : {employer?.address_cong_ty}</div>
              <div className="row">
                Tỉnh thành : {employer?.provinceData?.value}
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-3 shadow p-3">
            <div className="col w-100">
              <h3 className="h3 fw-bold mb-4">Thông tin chi tiết công ty</h3>
              <div className="row">
                <div className="col">
                  Quy mô công ty : {employer?.quy_mo_cong_ty} người
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Địa chỉ làm việc : {employer?.address_cong_ty}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Lĩnh vực hoạt động : {employer?.jobFieldData?.value}
                </div>
              </div>
              <div className="row">
                <div className="col">Website công ty : {employer?.website}</div>
              </div>
              <div className="row">
                <div className="col">Sdt công ty : {employer?.sdt_cong_ty}</div>
              </div>
            </div>
          </div>
          <div
            className={
              // employer?.mo_ta_cong_ty ?
              `row mt-1 mb-3 shadow p-3`
              //   : `d-none`
            }
          >
            <div className="">
              <h3 className="h3 fw-bold mb-4">Mô tả công ty</h3>
              <div className="row ">
                <div className="col" style={{ whiteSpace: "pre-line" }}>
                  {employer?.mo_ta_cong_ty}
                </div>
              </div>
            </div>
          </div>
          <div className={`row mt-1 mb-3 shadow p-3`}>
            <div className="col">
              <h3 className="h3 fw-bold mb-4">Tin đã đăng</h3>
              <div>
                {dataJobs.map((job, index) => (
                  <JobItem key={index} job={job} />
                ))}
              </div>
            </div>
          </div>
          <div className="row shadow mt-3 p-3">
            <h3 className="h3 fw-bold mb-3">Thông tin người liên hệ</h3>
            <div className="col-2">
              <img
                src={
                  employer?.userData?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="employer avatar"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div className="col">
              <div className="row">
                Username : {employer?.userData?.username}
              </div>
              <div className="row">Email : {employer?.userData?.email}</div>
              <div className="row">Sđt : {employer?.sdt_cong_ty}</div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default EmployerDetail;
