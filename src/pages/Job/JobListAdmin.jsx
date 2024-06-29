import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../configs/request.js";
import ReactPaginate from "react-paginate";

const JobListAdmin = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const formatDay = (unformattedDate) => {
    const dateObject = new Date(unformattedDate);
    // Extract components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; //getMonth() returns 0-based index
    const day = dateObject.getDate();
    // Format the date for MySQL
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };
  const handlePageClick = (event) => {
    fetchJobData(+event.selected + 1);
  };
  const fetchJobData = async (page = 1) => {
    let urlRequest = `/api/job?page=${page}&limit=7&order[]=createdAt&order[]=DESC`;
    await request
      .get(urlRequest)
      .then((res) => {
        setData(res.data.jobData.rows);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    fetchJobData();
  }, [deleted]);

  const handleDelete = (id) => {
    request
      .delete(`/api/job/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h3 className="text-center mt-3 fw-bold ">All jobs list</h3>
      <div className="d-flex justify-content-center mt-3">
        <div className=" w-100">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Vị trí</th>
                  <th>Số lượng</th>
                  <th>Job type</th>
                  <th>Salary</th>
                  <th>Province</th>
                  <th>Job field</th>
                  <th>deadline</th>
                  <th>create at</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.vi_tri}</td>
                      <td>{item.so_luong}</td>
                      <td>{item.jobTypeData.code}</td>
                      <td>{item.salaryData.code}</td>
                      <td>{item.provinceData.code}</td>
                      <td>{item.jobFieldData.code}</td>
                      <td>{formatDay(item.deadline)}</td>
                      <td>{formatDay(item.createdAt)}</td>
                      <td className="d-flex justify-content-center">
                        <Link
                          className="btn btn-primary"
                          to={`../update/${item.id}`}
                        >
                          Update
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
      </div>
    </div>
  );
};

export default JobListAdmin;
