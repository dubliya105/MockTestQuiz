import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import "../assets/styles/CreateExam.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { ProgressBar, Step } from "react-step-progress-bar";
import { RiAddCircleLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMzMjA1MzcwLCJleHAiOjE3MzMyOTE3NzB9.GkrBr4jaYbQuzrwt8j1SfxV7CFrs6A66QWtRosy0Uw4";

export default function CreateExam() {
  const [progress, setProgress] = useState(0);
  const [examName, setExamName] = useState(null);
  const [medium, setMedium] = useState(null);
  const [classId, setClassId] = useState(null);
  const [duration, setDuration] = useState('');
  const [examinationDate, setExaminationDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [subject, setSubject] = useState(null);
  const [allSubject, setAllSubject] = useState(null);
  const [allClasses, setAllClasses] = useState(null);
  const [totalQuestion, setTotalQuestion] = useState('');
  const [totalNumber, setTotalNumber] = useState('');
  const [error, setError] = useState(false);
  const [subError, setSubError] = useState(false);
  const [subjectData,setSubjectData]=useState({});

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

  useEffect(() => {
    getAllClasses();
  }, []);

  const handleSubjects=(e)=>{
    setSubject(e.target.value)

    if (allSubject.length !== 0) {
      setSubjectData(allSubject.find(item=>item._id===e.target.value))
    }
  }
  const handleBack = () => {
    if (progress === 50) setProgress(0);
  };

  const calculateDuration = (start, end) => {
    if (start && end) {
      const startTime = moment(start, 'HH:mm');
      const endTime = moment(end, 'HH:mm');
      const duration = moment.duration(endTime.diff(startTime));

      if(duration.asMinutes()>0){
        setDuration(duration.asMinutes());
      }else{
        setDuration('Invailed Start and End time')
      }
    }
  };

  useEffect(()=>{
    calculateDuration(startTime,endTime)
  },[startTime,endTime])
  
  const handleSubmit =async () => {
    try {
      setSubError(true);
      if(progress===50){
        if (subject && totalQuestion&&totalQuestion<=subjectData.questionBankCount&& totalNumber&&totalNumber<=subjectData.bharatSatQuestionCount) {
          const result = await axios.post(
            "http://192.168.0.27:5003/bharatSat/create-exam",{
              bharatSatExamId:"",
              bharatSatExamName:examName,
              bharatSatExamDate:examinationDate,
              examStartTime:startTime,
              examEndTime:endTime,
              medium: medium,
              class_id: classId,
              durationInMinutes: duration,
              subjectData: [
                  {
                      subjectId:subject,
                      numberOfQuestionsBank:totalQuestion,
                      numberOfQuestionsBharatSat: totalNumber
                  }
              ]
          },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (result.status === 200) {
            toast.success("Exam created successfully");
            setProgress(progress+50)
            setExamName('')
            setMedium('')
            setClassId('')
            setDuration('')
            setExaminationDate('')
            setStartTime('')
            setEndTime('')
            setSubject('')
            setTotalQuestion('')
            setTotalNumber('')
            setSubError(false)
            setError(false) 
          }
        }}
    } catch (error) {
      toast.error(error.response.data.error);
    }

  };

  const handleNext = () => {
    setError(true);
    if (progress === 0) {
      if (
        examName &&
        medium &&
        classId &&
        duration && duration>0&&
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
                    <option value="">Select Medium</option>
                    <option value="hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                  {error ? (
                    medium === "" || medium === null ? (
                      <p className="text-danger m-0 ">
                        Field can't be selected !
                      </p>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
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
                    onChange={(e) => setClassId(e.target.value)}
                  >
                    {allClasses?.map((item) => (
                      <option value={item._id}>{item.class_name}</option>
                    ))}
                    <option value="">Select Class</option>
                  </select>
                  {error ? (
                    classId === "" || classId === null ? (
                      <p className="text-danger m-0 ">
                        Field can't be selected!
                      </p>
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
                  {error&& (
                    !duration? (
                      <p className="text-danger m-0 ">Field can't be empty!</p>
                    ) : (
                      duration<1&& <p className="text-danger m-0 ">Invalid Start Time and End Time!</p>
                    )
                  ) }
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
                      {error ? (
                        startTime === "" || startTime === null ? (
                          <p className="text-danger m-0 ">
                            Field can't be empty!
                          </p>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-6">
                      <input
                        value={endTime}
                        className="form-control"
                        type="time"
                        onChange={(e) =>{ setEndTime(e.target.value)
                          
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
          ) : progress === 50 && (
            <div>
              <div className="mt-4 rounded-3  setp-2">
                <div className="row">
                  <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                    <div className="m-2">
                      <label
                        className="form-label fw-medium text-primary"
                        for="Select Subject"
                      >
                        Select Subject<span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="Select Subject"
                        id="Select Subject"
                        value={subject}
                        onChange={(e) => handleSubjects(e)}
                      >
                        {allSubject?.length===0?<option className="fw-bold" value={''}>No Subject</option>:<option className="fw-bold" value={''}>Select Subject</option>}
                        {allSubject?.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.subject_name}
                            </option>
                          );
                        })}
                      </select>
                      {subError && (subject === "" || subject === null) && 
                        <p className="text-danger m-0 ">
                          Field can't be selected!
                        </p>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                    <div className="m-2">
                      <label
                        className="form-label fw-medium text-primary"
                        for="Question Bank"
                      >
                        Total No. of Questions from Question Bank{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="Question Bank"
                        id="Question Bank"
                        value={totalQuestion}
                        onChange={(e) => {
                          if ( e.target.value >= 0) {
                            setTotalQuestion(e.target.value);
                            }
                        }}
                        placeholder="Total No. of Questions from Question Bank"
                      />
                      {subError&& (
                    !totalQuestion? (
                      <p className="text-danger m-0 ">Field can't be empty!</p>
                    ) :
                       totalQuestion>subjectData.questionBankCount&&<p className="text-danger m-0 ">please enter the question between 0-{subjectData.questionBankCount}!</p>
                  ) }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                      <div className="m-2">
                        <label
                          className="form-label fw-medium text-primary"
                          for="Bharat SAT Question Bank"
                        >
                          Total Number. of Questions from Bharat SAT Question
                          Bank <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="Bharat SAT Question Bank"
                          id="Bharat SAT Question Bank"
                          value={totalNumber}
                          onChange={(e) =>{ 
                            if ( e.target.value >= 0 ) {
                              setTotalNumber(e.target.value); 
                            }
                          }}
                          placeholder="Total Number. of Questions from Bharat SAT Question Bank"
                        />
                       {subError&& (
                    !totalNumber? (
                      <p className="text-danger m-0 ">Field can't be empty!</p>
                    ) : (
                      totalNumber>subjectData.bharatSatQuestionCount&&<p className="text-danger m-0 ">please enter the question between 0-{subjectData.bharatSatQuestionCount}!</p>
                    )
                  ) }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-primary fw-medium p-3">
                  <RiAddCircleLine /> Add More
                </div>
              </div>
              <div className="d-flex justify-content-end py-3">
                <div
                  className="btn-group mx-2"
                  onClick={handleSubmit}
                >
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
          )}
          {
            progress===100&&(<div>
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
            </div>)
          }
        </div>
      </div>
      <ToastContainer/>
    </MainLayout>
  );
}
