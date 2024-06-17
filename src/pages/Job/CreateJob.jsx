import React, { useState } from "react";

function CreateJob() {
  const [formData, setFormData] = useState({
    title: "",
    post_code: "",
    so_luong_tuyen: "",
    cap_bac: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData); // Example: log form data to console
  };

  return (
    <div className="form-update-user">
      <h3 className="fs-16 color-main text-uppercase">Thông tin công việc</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="required">
            Vị trí tuyển dụng:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="VD: Nhân Viên Kinh Doanh, Trưởng Nhóm Marketing,..."
            required
            minLength="2"
            maxLength="3000"
            value={formData.title}
            onChange={handleChange}
          />
          <span
            className="fs-13 font-italic color-999 mt-5"
            style={{ display: "block", color: "red" }}
          >
            (Lưu ý: Vị trí tuyển dụng sẽ không được chỉnh sửa sau khi tin tuyển
            dụng được duyệt)
          </span>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="post_code">Mã số:</label>
              <input
                type="text"
                className="form-control"
                id="post_code"
                name="post_code"
                placeholder="Nhập mã số tuyển dụng"
                value={formData.post_code}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="so_luong_tuyen" className="required">
                Số lượng tuyển:
              </label>
              <input
                type="number"
                className="form-control"
                id="so_luong_tuyen"
                name="so_luong_tuyen"
                placeholder="Số lượng tuyển dụng"
                required
                value={formData.so_luong_tuyen}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="cap_bac" className="required">
                Cấp bậc:
              </label>
              <select
                className="form-control"
                id="cap_bac"
                name="cap_bac"
                required
                value={formData.cap_bac}
                onChange={handleChange}
              >
                <option value="1">Mới tốt nghiệp / Thực tập sinh</option>
                <option value="2">Nhân viên</option>
                <option value="3">Trưởng nhóm</option>
                <option value="4">Trưởng phòng</option>
                <option value="5">Phó giám đốc</option>
                <option value="6">Giám đốc</option>
                <option value="7">Tổng giám đốc điều hành</option>
                <option value="10">Khác</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default CreateJob;
