import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { IoAdd } from "react-icons/io5";
import "../assets/styles/BharatSatExam.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import StatusChange from "./StatusChange";
import GenrateTicketModal from "./GenrateTicketModal";
import { debounce } from "lodash";
import DeleteBharatSatExam from "./DeleteBharatSatExam";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMzNDY0NDMxLCJleHAiOjE3MzM1NTA4MzF9.e_qwxeFk2LEmxn8i8yDNgqNMdrIpR1epMU-q_SqKAK0";

export default function BharatSATExam() {
  const [examData, setExamData] = useState([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [availableDataCount, setAvailableDataCount] = useState(0);
  const [checkId, setcheckId] = useState([]);

  const [examStatus, setExamStatus] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const handleGetExamList = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.27:5003/bharatSat/list-all-exam",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            offset: offset,
            limit: limit,
            searchQuery: searchQuery.trim(),
          },
        }
      );
      if (result.status === 200) {
        setExamData(result.data.data);
        setTotalPage(Math.ceil(result.data.availableDataCount / limit));
        setAvailableDataCount(result.data.availableDataCount);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const debouncedFetchResults = debounce((value) => {
    setSearchQuery(value);
    setOffset(0);
  }, 500);

  const handleSetDeleteId = (id) => {
    if (checkId.includes(id)) {
      setcheckId(checkId.filter((checkid) => checkid !== id));
      console.log(checkId.filter((checkid) => checkid !== id));
    } else {
      setcheckId([...checkId, id]);
      console.log([...checkId, id]);
    }
  };
  const handelAllCheck = () => {
    if (checkId.length !== examData.length) {
      setcheckId(examData.map((item) => item.bharatSatExamId));
      console.log(examData.map((item) => item.bharatSatExamId));
    } else {
      setcheckId([]);
    }
  };
  useEffect(() => {
    handleGetExamList();
  }, [offset, searchQuery, checkId]);

  return (
    <MainLayout>
      <div className="text-start d-flex justify-content-between">
        <h4>BHARAT SAT</h4>
        <div className="d-flex">
          <p>Dashboard</p>
          <Link to="">-Coordinater</Link>
        </div>
      </div>
      <div className=" rounded-2 bg-light text-start p-3">
        <div className="">
          <h6>Bharat SAT Exam List </h6>
          <div className=" d-flex justify-content-between text-center align-items-center gap-3 pt-2">
          <div className="col-auto">
            {checkId.length !== 0 ? (
              <Link
                className=" bg-danger rounded-2 py-1 px-2 "
                data-bs-toggle="modal"
                data-bs-target="#deleteModel"
              >
                <HiOutlineTrash className="text-light " />
              </Link>
            ) : (
              <Link className=" bg-danger-subtle rounded-2 py-1 px-2 ">
                <HiOutlineTrash className="text-light " />
              </Link>
            )}
          </div>
            <div className="d-flex justify-content-end text-center align-items-center gap-3">
              <div>
                <input
                  onChange={(e) => debouncedFetchResults(e.target.value)}
                  className="form-control w-100 "
                  type="search"
                  placeholder="Search "
                />
              </div>
              <Link className="btn-group text-decoration-none text-truncate" to="/createExam">
                <button
                  className="btn btn-primary px-2 "
                  style={{ backgroundColor: "rgb(19, 19, 191)" }}
                >
                  Add Exam
                </button>
                <button className="btn btn-primary px-2">
                  <IoAdd />
                </button>
              </Link>
            </div>
          </div>
          <div
            className="Exam-list overflow-auto pt-3"
            style={{ height: "100vh" }}
          >
            <table className="table m-0">
              <thead className="exam-head">
                <tr>
                  <th className="text-center px-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={
                        examData.length !== 0 &&
                        checkId.length === examData.length
                      }
                      onClick={() => handelAllCheck()}
                    />
                  </th>
                  <th className="px-4">Sr No.</th>
                  <th className="px-4">Bharat SAT Exam Name</th>
                  <th className="px-4">Class</th>
                  <th className="px-4">Medium</th>
                  <th className="px-4">Exam Date</th>
                  <th className="px-4">Exam Start Time</th>
                  <th className="px-4">Exam End Time</th>
                  <th className="px-4">View Exam Pepar</th>
                  <th className="px-4">Genrate E-Hall Ticket</th>
                  <th className="px-4">Current Status</th>
                  <th className="px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {examData.length !== 0 ? (
                  examData.map((exam, index) => (
                    <tr key={index} className="">
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className=" form-check-input"
                          checked={checkId.includes(exam.bharatSatExamId)}
                          onChange={() =>
                            handleSetDeleteId(exam.bharatSatExamId)
                          }
                        />
                      </td>
                      <td className="px-4">{limit * offset + index + 1}</td>
                      <td className="px-4">{exam.bharatSatExamName}</td>
                      <td className="px-4">{exam.className}</td>
                      <td className="px-4">{exam.medium}</td>
                      <td className="px-4">{exam.bharatSatExamDate}</td>
                      <td className="px-4">{exam.examStartTime}</td>
                      <td className="px-4">{exam.examEndTime}</td>
                      <td className="px-4">
                        <Link to={`/bharatSatExamView/${exam.bharatSatExamId}`}>
                          Veiw
                        </Link>
                      </td>
                      <td className="px-4">
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target="#genrateTicket"
                          onClick={() => setExamStatus(exam)}
                        >
                          Genrate
                        </Link>
                        <GenrateTicketModal
                          data={examStatus}
                          handleGetExamList={handleGetExamList}
                        />
                      </td>
                      <td className="px-4">
                        <label
                          className="switch-exam"
                          data-bs-toggle="modal"
                          data-bs-target="#confirmationModal"
                          onClick={() => setExamStatus(exam)}
                        >
                          <input type="checkbox" checked={exam.is_active} />
                          <span className="slider-exam round"></span>
                        </label>
                        <StatusChange
                          data={examStatus}
                          handleGetExamList={handleGetExamList}
                        />
                      </td>
                      <td>
                        <div className="d-flex gap-2 px-4">
                          <Link
                            to="/createExam"
                            state={{ data: exam }}
                            className=" bg-success-subtle rounded-2 p-1 px-2 btn "
                          >
                            <FiEdit3 className=" text-success " />
                          </Link>
                          <Link
                            className=" bg-danger-subtle rounded-2 p-1 px-2 btn "
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModel"
                            onClick={() => setcheckId([exam.bharatSatExamId])}
                          >
                            <HiOutlineTrash className=" text-danger " />
                          </Link>
                          <DeleteBharatSatExam
                            data={checkId}
                            handleGetExamList={handleGetExamList}
                            setcheckId={setcheckId}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    {" "}
                    <td colSpan="12" className="">
                      {" "}
                      Data Not available !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {availableDataCount > 0 && (
            <div className="d-flex justify-content-between align-items-center pt-2">
              <div>
                Showing {limit * offset + 1} to{" "}
                {offset + 1 === totalPage
                  ? availableDataCount
                  : availableDataCount < limit
                  ? availableDataCount
                  : (offset + 1) * limit}
                &nbsp;of {availableDataCount}
                &nbsp;entries
              </div>
              {totalPage > 1 && (
                <div>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={(value) => setOffset(value.selected)}
                    pageRangeDisplayed={2}
                    pageCount={totalPage}
                    previousLabel="Prev"
                    containerClassName="pagination gap-2 w-100"
                    pageClassName="p-2 border rounded-3 "
                    pageLinkClassName="text-decoration-none px-2 "
                    previousClassName="page-item p-2 "
                    previousLinkClassName={`text-decoration-none ${
                      offset === 0 ? "offset-page" : "text-primary"
                    } `}
                    nextClassName="page-item p-2"
                    nextLinkClassName={`text-decoration-none ${
                      offset === totalPage - 1 ? "offset-page" : "text-primary"
                    } `}
                    breakLinkClassName=" text-decoration-none"
                    activeClassName="ative-page rounded-3 "
                    activeLinkClassName="text-light"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}
