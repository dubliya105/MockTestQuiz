import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/CreateExam.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { ProgressBar, Step } from "react-step-progress-bar";
import { RiAddCircleLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { HiOutlineTrash } from "react-icons/hi";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMzNDY0NDMxLCJleHAiOjE3MzM1NTA4MzF9.e_qwxeFk2LEmxn8i8yDNgqNMdrIpR1epMU-q_SqKAK0";

export default function CreateExam() {
  const [progress, setProgress] = useState(0);
  const [allSubject, setAllSubject] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [examName, setExamName] = useState("");
  const [medium, setMedium] = useState("");
  const [classId, setClassId] = useState("");
  const [duration, setDuration] = useState("");
  const [examinationDate, setExaminationDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(false);
  const [subError, setSubError] = useState(false);
  const [classData, setClassData] = useState("");
  const location = useLocation();

  const [addInput, setAddInput] = useState([
    {
      subjectId: "",
      numberOfQuestionsBank: "",
      numberOfQuestionsBharatSat: "",
    },
  ]);

  const { data } = location.state || {};

  useEffect(() => {
    getAllClasses();
    if (data) {
      setClassData(data.bharatSatExamId);
      setExamName(data.bharatSatExamName);
      setMedium(data.medium);
      setClassId(data.class_id);
      setDuration(data.durationInMinutes);
      setExaminationDate(
        moment(data.bharatSatExamDate, "DD/MM/YYYY").format("MM/DD/YYYY")
      );
      setStartTime(data.examStartTime);
      setEndTime(data.examEndTime);
      setAddInput(data.subjectData);
    }
  }, []);

  const handleAddMore = () => {
    setAddInput([
      ...addInput,
      {
        subjectId: "",
        numberOfQuestionsBank: "",
        numberOfQuestionsBharatSat: "",
      },
    ]);
  };

  const handleInputChange = (e, index, field) => {
    const newAddInput = [...addInput];
    newAddInput[index][field] = e.target.value;
    setAddInput(newAddInput);
  };
  const handleDelete = () => {
    setAddInput(
      addInput.filter((item, index) => index !== addInput.length - 1)
    );
  };

  const getAllSubject = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.27:5003/subject/getAllSubjects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            class_id: classId,
          },
        }
      );
      if (result.status === 200) {
        setAllSubject(result.data.data);
        // handleSubjects(subject);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getAllClasses = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.27:5003/class/getAllClasses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setAllClasses(result.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleBack = () => {
    if (progress === 50) setProgress(0);
  };

  const calculateDuration = (start, end) => {
    if (start && end) {
      const startTime = moment(start, "HH:mm");
      const endTime = moment(end, "HH:mm");
      const duration = moment.duration(endTime.diff(startTime));

      if (duration.asMinutes() > 0) {
        setDuration(duration.asMinutes());
      } else {
        setDuration("Invailed Start and End time");
      }
    }
  };

  useEffect(() => {
    calculateDuration(startTime, endTime);
  }, [startTime, endTime]);

  const handleSubmit = async () => {
    console.log(addInput);
    setSubError(true);
    const isValid = addInput.every(
      (item) =>
        item.subjectId &&
        item.numberOfQuestionsBank>=0 && item.numberOfQuestionsBank!==''&&
        item.numberOfQuestionsBharatSat>=0 &&item.numberOfQuestionsBharatSat!==''&&
        allSubject.some(
          (val) =>
            val._id === item.subjectId &&
            val.questionBankCount >= item.numberOfQuestionsBank &&
            val.bharatSatQuestionCount >= item.numberOfQuestionsBharatSat
        )
    );
    if (isValid) {
      try {
        if (progress === 50) {
          const result = await axios.post(
            "http://192.168.0.27:5003/bharatSat/create-exam",
            {
              bharatSatExamId: classData ? classData : "",
              bharatSatExamName: examName,
              bharatSatExamDate: examinationDate,
              examStartTime: startTime,
              examEndTime: endTime,
              medium: medium,
              class_id: classId,
              durationInMinutes: duration,
              subjectData: addInput,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (result.status === 200) {
            toast.success("Exam created successfully");
            setProgress(progress + 50);
            setExamName("");
            setMedium("");
            setClassId("");
            setDuration("");
            setExaminationDate("");
            setStartTime("");
            setEndTime("");
            setSubError(false);
            setError(false);
            setClassData([]);
          }
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };

  const handleClassSelect = (e) => {
    setClassId(e.target.value);
    setAddInput([
      {
        subjectId: "",
        numberOfQuestionsBank: "",
        numberOfQuestionsBharatSat: "",
      },
    ]);
  };

  const handleNext = () => {
    setError(true);
    if (progress === 0) {
      if (
        examName &&
        medium &&
        classId &&
        duration &&
        duration > 0 &&
        examinationDate &&
        startTime &&
        endTime
      ) {
        getAllSubject();
        setProgress(50);
      }
    }
  };
  return (
    <MainLayout>
      <div>
        <div className="text-start d-flex justify-content-between">
          <h4>Create Exam</h4>
          <div className="d-flex">
            <p>Dashboard {">"}</p>
            <Link to="" className=" text-decoration-none">
              Bharat SAT
            </Link>
          </div>
        </div>
        <div className="bg-light text-start p-3">
          <h5>Create Bharat SAT Exam</h5>
          <div className="p-4">
            <ProgressBar percent={progress} filledBackground="rgb(10, 10, 163)">
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    className={`rounded-circle ${
                      accomplished ? "active-page" : "de-active"
                    } p-3`}
                    onClick={() => handleBack()}
                  >
                    01
                  </div>
                )}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    className={`rounded-circle ${
                      accomplished ? "active-page" : "de-active"
                    } p-3`}
                  >
                    02
                  </div>
                )}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    className={`rounded-circle ${
                      accomplished ? "active-page" : "de-active"
                    } p-3`}
                  >
                    03
                  </div>
                )}
              </Step>
            </ProgressBar>
          </div>
          {progress === 0 ? (
            <div>
              <div className="row pt-5">
                <div className="col-6">
                  <div className=" fw-medium">Bharat SAT Exam </div>
                  <input
                    value={examName}
                    type="text"
                    className="form-control"
                    placeholder="Bharat SAT Exam Name"
                    onChange={(e) => setExamName(e.target.value)}
                  />
                  {error ? (
                    examName === "" || examName === null ? (
                      <p className="text-danger m-0 ">Field can't be empty!</p>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-6">
                  <div className=" fw-medium">Medium </div>
                  <select
                    type="text"
                    className="form-select"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Medium
                    </option>
                    <option value="hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                  {error && (medium === "" || medium === null) && (
                    <p className="text-danger m-0 ">
                      Field can't be selected !
                    </p>
                  )}
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <div className=" fw-medium">Select Class </div>
                  <select
                    type="text"
                    className="form-select"
                    value={classId}
                    onChange={(e) => {
                      handleClassSelect(e);
                    }}
                  >
                    {allClasses?.map((item) => (
                      <option value={item._id}>{item.class_name}</option>
                    ))}
                    <option value="" disabled>
                      Select Class
                    </option>
                  </select>
                  {error && (classId === "" || classId === null) && (
                    <p className="text-danger m-0 ">Field can't be selected!</p>
                  )}
                </div>
                <div className="col-6">
                  <label htmlFor="" className=" fw-medium">
                    Exam Timings
                  </label>
                  <div className="row">
                    <div className="col-6">
                      <input
                        value={startTime}
                        className="form-control"
                        type="time"
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                      {error && (startTime === "" || startTime === null) && (
                        <p className="text-danger m-0 ">
                          Field can't be empty!
                        </p>
                      )}
                    </div>
                    <div className="col-6">
                      <input
                        value={endTime}
                        className="form-control"
                        type="time"
                        onChange={(e) => {
                          setEndTime(e.target.value);
                        }}
                      />
                      {error && (endTime === "" || endTime === null) && (
                        <p className="text-danger m-0 ">
                          Field can't be empty!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <div className=" fw-medium">Bharat SAT Examination Date </div>
                  <DatePicker
                    wrapperClassName="w-100"
                    className="form-control"
                    selected={examinationDate}
                    dateFormat="MM-dd-yyyy"
                    onChange={(e) => {
                      setExaminationDate(moment(e).format("MM-DD-YYYY"));
                    }}
                    minDate={new Date()}
                    placeholderText="MM/DD/YYYY"
                    showMonthDropdown
                    showYearDropdown
                  />
                  {error ? (
                    examinationDate === "" || examinationDate === null ? (
                      <p className="text-danger m-0 ">Field can't be empty!</p>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-6">
                  <div className=" fw-medium">Duration in Mins </div>
                  <input
                    value={duration}
                    type="text"
                    className="form-control"
                    placeholder="Duration in Mins"
                  />
                  {error &&
                    (!duration ? (
                      <p className="text-danger m-0 ">Field can't be empty!</p>
                    ) : (
                      duration < 1 && (
                        <p className="text-danger m-0 ">
                          Invalid Start Time and End Time!
                        </p>
                      )
                    ))}
                </div>
              </div>
              <div className="d-flex justify-content-end py-5">
                <div className="btn-group" onClick={() => handleNext()}>
                  <button
                    className="btn btn-primary px-2"
                    style={{ backgroundColor: "rgb(19, 19, 191)" }}
                  >
                    Next
                  </button>
                  <button className="btn btn-primary px-2">
                    <FaArrowRightLong />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            progress === 50 && (
              <div>
                <div className="mt-4 rounded-3  setp-2">
                  {addInput?.map((subData, index) => {
                    return (
                      <div className="row">
                        <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                          <div className="m-2">
                            <label
                              className="form-label fw-medium text-primary"
                              for="Select Subject"
                            >
                              Select Subject
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select"
                              name="Select Subject"
                              id="Select Subject"
                              placeholder=""
                              value={subData.subjectId}
                              onChange={(e) =>
                                handleInputChange(e, index, "subjectId")
                              }
                            >
                              {allSubject?.length === 0 ? (
                                <option className="fw-bold" value={""} disabled>
                                  No Subject
                                </option>
                              ) : (
                                <option className="fw-bold" disabled value={""}>
                                  Select Subject
                                </option>
                              )}
                              {allSubject?.map((item) => (
                                <option
                                  key={item._id}
                                  value={item._id}
                                  disabled={addInput.some(
                                    (val) => val.subjectId === item._id
                                  )}
                                >
                                  {item.subject_name}
                                </option>
                              ))}
                            </select>
                            {subError && !subData.subjectId && (
                              <p className="text-danger m-0 ">
                                Field can't be empty!
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                          <div className="m-2">
                            <label
                              className="form-label fw-medium text-primary"
                              for="Question Bank"
                            >
                              Total No. of Questions from Question Bank
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="Question Bank"
                              id="Question Bank"
                              value={subData.numberOfQuestionsBank}
                              onChange={(e) =>{
                                if(e.target.value>=0){
                                handleInputChange(
                                  e,
                                  index,
                                  "numberOfQuestionsBank"
                                )}}
                              }
                              placeholder="Total No. of Questions from Question Bank"
                            />
                            {subError && subData.numberOfQuestionsBank===''&&subData.numberOfQuestionsBank<0  ? (
                              <p className="text-danger m-0 ">
                                Field can't be empty!
                              </p>
                            ) : (
                              allSubject.map(
                                (val) =>
                                  val._id === subData.subjectId &&
                                  val.questionBankCount <
                                    subData.numberOfQuestionsBank && (
                                    <p className="text-danger m-0 ">
                                      Enter between 0 to {val.questionBankCount}
                                    </p>
                                  )
                              )
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                            <div className="m-2">
                              <label
                                className="form-label fw-medium text-primary"
                                for="Bharat SAT Question Bank"
                              >
                                Total Number. of Questions from Bharat SAT
                                Question Bank
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="Bharat SAT Question Bank"
                                id="Bharat SAT Question Bank"
                                value={subData.numberOfQuestionsBharatSat}
                                onChange={(e) =>{
                                  if(e.target.value>=0){
                                  handleInputChange(
                                    e,
                                    index,
                                    "numberOfQuestionsBharatSat"
                                  )}}
                                }
                                placeholder="Total Number. of Questions from Bharat SAT Question Bank"
                              />
                              {subError &&
                              subData.numberOfQuestionsBharatSat===''&&subData.numberOfQuestionsBharatSat<=0 ? (
                                <p className="text-danger m-0 ">
                                  Field can't be empty!
                                </p>
                              ) : (
                                allSubject.map(
                                  (val) =>
                                    val._id === subData.subjectId &&
                                    val.bharatSatQuestionCount <
                                      subData.numberOfQuestionsBharatSat && (
                                      <p className="text-danger m-0 ">
                                         Enter between 0 to
                                        {val.bharatSatQuestionCount}
                                      </p>
                                    )
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="d-flex justify-content-between align-items-center px-4">
                    <div className="text-primary fw-medium p-3">
                      <Link
                        className=" text-decoration-none"
                        onClick={handleAddMore}
                      >
                        <RiAddCircleLine /> Add More
                      </Link>
                    </div>
                    {addInput.length > 1 && (
                      <div className="text-primary fw-medium p-3">
                        <Link
                          className=" text-decoration-none text-danger"
                          onClick={handleDelete}
                        >
                          <HiOutlineTrash /> Delete
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end py-3">
                  <div className="btn-group mx-2" onClick={handleSubmit}>
                    <button
                      className="btn btn-primary px-2 w-100"
                      style={{ backgroundColor: "rgb(19, 19, 191)" }}
                    >
                      Submit
                    </button>
                    <button className="btn btn-primary px-2">
                      <FaArrowRightLong />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
          {progress === 100 && (
            <div>
              <div className=" d-flex justify-content-center pt-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpw5vc_Dmfu61vqCOG-gdq5k_V7s7vnlMuOw&s"
                  alt=""
                />
              </div>
              <h5 className="text-center fw-bold text-primary">Well Done</h5>
              <div className="text-center ">
                You have successfully create exam
              </div>
              <div className=" d-flex justify-content-between py-3">
                <button className="btn text-primary">
                  <FaArrowLeftLong /> &nbsp; Back
                </button>
                <div className="btn-group mx-2" onClick={() => setProgress(0)}>
                  <button
                    className="btn btn-primary px-2 w-100"
                    style={{ backgroundColor: "rgb(19, 19, 191)" }}
                  >
                    Create Bharat SAT Exam
                  </button>
                  <button className="btn btn-primary px-2">
                    <IoMdAdd />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}
