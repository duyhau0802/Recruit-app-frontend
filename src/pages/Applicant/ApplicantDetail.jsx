import React, { useEffect, useState } from "react";
import request from "../../configs/request";
import { useParams } from "react-router-dom";
import formatDay from "../../utils/formatDay";

const ApplicantDetail = () => {
  const [applicant, setApplicant] = useState({});
  const { id } = useParams();
  useEffect(() => {
    request.get(`/api/applicant/getbyid/${id}`).then((res) => {
      setApplicant(res.data);
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
          {/* thong tin chung */}
          <div className="row shadow mt-3 p-3">
            <h3 className="h3 fw-bold mb-3">Thông tin chung</h3>
            <div className="col-2">
              <img
                src={
                  applicant?.userData?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="applicant avatar"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div className="col">
              <div className="row">
                Username : {applicant?.userData?.username}
              </div>
              <div className="row">Email : {applicant?.userData?.email}</div>
              <div className="row">Sđt : {applicant?.sdt_cong_ty}</div>
            </div>
          </div>
          {/* Thong tin chi tiet */}
          <div className="row mt-3 mb-3 shadow p-3">
            <div className="col w-100">
              <h3 className="h3 fw-bold mb-4">Thông tin chi tiết</h3>
              <div className="row">
                <div className="col">
                  Giới tính : {applicant?.gioi_tinh} người
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Ngày sinh : {formatDay(applicant?.ngay_sinh)}
                </div>
              </div>
              <div className="row">
                <div className="col">Địa chỉ : {applicant?.dia_chi}</div>
              </div>
              <div className="row">
                <div className="col">
                  Tỉnh thành : {applicant?.currentProvinceData?.value}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Bằng cấp : {applicant?.degreeData?.value}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Kinh nghiệm : {applicant?.kinh_nghiem} năm
                </div>
              </div>
            </div>
          </div>
          {/* kỹ năng */}
          <div className={`row mt-1 mb-3 shadow p-3`}>
            <div className="">
              <h3 className="h3 fw-bold mb-4">Kỹ năng</h3>
              <div className="row ">
                <div className="col" style={{ whiteSpace: "pre-line" }}>
                  {applicant?.ky_nang}
                </div>
              </div>
            </div>
          </div>
          {/* Mong muon */}
          <div className="row mt-3 mb-3 shadow p-3">
            <div className="col w-100">
              <h3 className="h3 fw-bold mb-4">Nguyện vọng</h3>
              <div className="row">
                <div className="col">
                  Lĩnh vực mong muốn : {applicant?.jobFieldData?.value}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Hình thức làm việc : {applicant?.jobTypeData?.value}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Mức lương : {applicant?.salaryData?.value}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Tỉnh thành : {applicant?.desiredProvinceData?.value}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ApplicantDetail;
