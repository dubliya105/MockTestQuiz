import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import "../assets/styles/QusetionReview.css";
import { FiEdit3 } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import QuestionStatus from "./QuestionStatus";
import { CirclesWithBar } from "react-loader-spinner";
import QuestionReject from "./QuestionReject";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzM2OTIwNzgxLCJleHAiOjE3MzcwMDcxODF9.OUTfXHjfMQ7EiBZR9XatVMmpDWH2LzdPUMPv8hZzheo";

function QuestionReview() {
  const [allClasses, setAllClasses] = useState([]);
  const [selectClass, setSelectClass] = useState("");
  const [selectSubject, setSelectSubject] = useState("");
  const [selectMedium, setSelectMedium] = useState("English");
  const [allSubject, setAllSubject] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [currentQue, setCurrentQue] = useState(0);
  const [loader, setLoader] = useState(true);
  const getAllClasses = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.21:5003/class/getAllClasses"
      );
      if (result.status === 200) {
        setAllClasses(result.data?.data);
        handleSelectedClass(result.data?.data[0]._id);
      }else{
        setAllQuestion([]);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }finally{
      setLoader(false);
    }
  };

  const getAllSubject = async (id) => {
    try {
      setLoader(true);
      const result = await axios.get(
        "http://192.168.0.21:5003/subject/getAllSubjects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            class_id: id,
          },
        }
      );
      if (result.status === 200) {
        setAllSubject(result.data.data);
        if (result.data.data.length > 0) {
          handleSelectSubject(result.data.data[0]._id);
        } else {
          setSelectSubject("");
          setAllQuestion([]);
        }
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }finally{
      setLoader(false);
    }
  };
  const handleSelectedClass = (id) => {
    setSelectClass(id);
    getAllSubject(id);
  };

  const handleSelectSubject = (subject_id) => {
    setSelectSubject(subject_id);
  };
  const handleGetAllQuestion = async () => {
    try {
      setLoader(true);
      const result = await axios.get(
        "http://192.168.0.21:5003/reviewer/question-list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            medium: selectMedium,
            class_id: selectClass,
            subject_id: selectSubject,
          },
        }
      );
      if (result.status === 200) {
        setAllQuestion(result.data.data);
        // console.log(result.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoader(false);
    }
  };

  const handleSubAndQue = (i) => {
    if (i >= 0 && i < allQuestion.length) {
      setCurrentQue(i);
    }
  };
  useEffect(() => {
    if (selectSubject) {
      setCurrentQue(0);
      handleGetAllQuestion();
    }
  }, [selectSubject, selectMedium]);

  useEffect(() => {
    getAllClasses();
  }, []);
  const options = {
    replace: (domNode) => {
      // Handle <img> tags
      if (domNode.name === "img") {
        const { src } = domNode.attribs;
        return (
          <img
            src={src}
            width={500}
            height={400}
            className="img-fluid"
            alt="Content Thumbnail"
          />
        );
      }
      // Handle <oembed> for videos
      if (domNode.name === "oembed") {
        const videoUrl = domNode.attribs.url;
        const embedUrl = videoUrl.replace("youtu.be/", "youtube.com/embed/");
        return (
          <iframe
            className="emded1"
            src={embedUrl}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }
    },
  };

  return (
    <MainLayout>
      <div className="text-start d-flex justify-content-between ">
        <h4 className="text-truncate"> Question Bank Review</h4>
        <div className="d-flex text-truncate">
          <label className=" "> Dashboard {">"}</label>
          <Link to="" className=" text-decoration-none text-truncate">
            Question Bank Review
          </Link>
        </div>
      </div>
      <div className="bg-light text-start p-3">
        <h5> Question Paper</h5>
        <div className="py-4">
          <div className="row gap-1">
            <div className=" col-12 col-sm-8 col-md-8 col-lg-3">
              <select
                className="form-select"
                value={selectClass}
                onChange={(e) => handleSelectedClass(e.target.value)}
              >
                <option value={""} disabled>
                  Select class
                </option>
                {allClasses?.map((item) => (
                  <option value={item._id}>{item.class_name}</option>
                ))}
              </select>
            </div>
            <div className=" col-12 col-sm-8 col-md-8 col-lg-3">
              <select
                value={selectMedium}
                className="form-select"
                onChange={(e) => setSelectMedium(e.target.value)}
              >
                <option value="" disabled>
                  Select Medium
                </option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
            <div className=" col-12 col-sm-8 col-md-8 col-lg-3">
              <select
                value={selectSubject}
                className="form-select"
                onChange={(e) => handleSelectSubject(e.target.value)}
              >
                {allSubject?.length === 0 && (
                  <option className="fw-bold" value={""}>
                    No Subject
                  </option>
                )}
                {allSubject?.length !== 0 &&
                  allSubject?.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                      disabled={selectSubject === item._id}
                    >
                      {item.subject_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {allQuestion.length
            ? allQuestion?.map((data, index) => {
                return (
                  <div>
                    {index === currentQue && (
                      <div className=" text-start pt-2" key={index}>
                        <div className="px-3">
                          <p className="">
                            <strong>Question {index + 1}</strong>
                          </p>
                          <div className="fw-medium">
                            {parse(data.question, options)}
                          </div>
                          {/* show Subquestions */}
                          {data?.subQuestions?.map((quest, indexSub) => {
                            return (
                              <div className=" text-start pt-2" key={indexSub}>
                                <div>
                                  <div className=" fw-medium">
                                    {indexSub + 1}.{" "}
                                    <label>
                                      {parse(quest.question, options)}
                                    </label>
                                  </div>
                                  <form>
                                    {quest.options?.map((option, optIndex) => (
                                      <div
                                        className="form-check py-1  d-flex justify-content-md-start"
                                        key={optIndex}
                                      >
                                        <label className="form-check-label d-flex align-items-center">
                                          <label className="checkbox-wrapper ">
                                            {/* correct Answer */}
                                            {quest.correctOption ===
                                              optIndex && (
                                              <input
                                                className="custom-icon-checkbox"
                                                type="checkbox"
                                                checked={true}
                                              />
                                            )}

                                            {quest.correctOption ===
                                            optIndex ? (
                                              <span className="checkbox-icon"></span>
                                            ) : (
                                              <span className="empty"></span>
                                            )}
                                          </label>
                                          {
                                            <label
                                              className={
                                                quest.correctOption ===
                                                  optIndex && "correct-option"
                                              }
                                            >
                                              {String.fromCharCode(
                                                65 + optIndex
                                              )}
                                              .&nbsp;
                                              {option
                                                .replace(/<[^>]*>/g, "")
                                                .replace(/&nbsp;/g, " ")}
                                            </label>
                                          }
                                        </label>
                                        <div className=" fst-italic fw-medium ">
                                          {/* check correct answer */}
                                          {optIndex === quest.correctOption && (
                                            <label style={{ color: "#22e822" }}>
                                              &nbsp; Correct Answer
                                            </label>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </form>
                                </div>
                                <div>
                                  {quest.solution !== "" && (
                                    <div>
                                      <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                                        <Link
                                          className=" fw-bold fst-italic"
                                          data-bs-toggle="collapse"
                                          to={`#collapseExample${indexSub}`}
                                          role="button"
                                          aria-expanded="false"
                                          aria-controls={`collapseExample${indexSub}`}
                                          style={{ color: "#ff6f00e6" }}
                                        >
                                          Solution
                                        </Link>
                                      </button>
                                      <div
                                        className="collapse"
                                        id={`collapseExample${indexSub}`}
                                      >
                                        <div className="ps-3 ">
                                          {parse(quest.solution, options)}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                          {/* show option  */}
                          <form>
                            {data?.options?.map((option, optIndex) => (
                              <div
                                className="form-check py-1 d-flex  justify-content-md-start"
                                key={optIndex}
                              >
                                <label className="form-check-label d-flex align-items-center">
                                  <label className="checkbox-wrapper pe-2">
                                    {/* correct Answer */}
                                    {data.correctOption === optIndex && (
                                      <input
                                        className="custom-icon-checkbox"
                                        type="checkbox"
                                        checked={true}
                                      />
                                    )}

                                    {data.correctOption === optIndex ? (
                                      <span className="checkbox-icon"></span>
                                    ) : (
                                      <span className="empty"></span>
                                    )}
                                  </label>
                                  {
                                    <label
                                      className={`${
                                        data.correctOption === optIndex &&
                                        "correct-option"
                                      } d-flex`}
                                    >
                                      <div className="">
                                        {String.fromCharCode(65 + optIndex)}.
                                      </div>
                                      &nbsp;
                                      {option
                                        .replace(/<[^>]*>/g, "")
                                        .replace(/&nbsp;/g, "")}
                                    </label>
                                  }
                                </label>
                                <div className=" fst-italic fw-medium ">
                                  {optIndex === data.correctOption && (
                                    <label style={{ color: "#22e822" }}>
                                      &nbsp; Correct Answer
                                    </label>
                                  )}
                                </div>
                              </div>
                            ))}
                          </form>
                        </div>
                        <div className="d-flex justify-content-between px-2">
                          <div>
                            {data?.solution && (
                              <div>
                                <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                                  <Link
                                    className=" fw-bold fst-italic"
                                    data-bs-toggle="collapse"
                                    to={`#collapseExampleOne`}
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls={`collapseExampleOne`}
                                    style={{ color: "#ff6f00e6" }}
                                  >
                                    Solution
                                  </Link>
                                </button>
                                <div
                                  className="collapse"
                                  id={`collapseExampleOne`}
                                >
                                  <div className="ps-3 ">
                                    {parse(data.solution, options)}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <div className=" d-flex gap-3 ">
                              <Link
                              to={'/questionEdit'}
                              state={{ questionData: data }}
                                className="px-3 py-2 rounded-2"
                                style={{
                                  backgroundColor: "#ecf3ff",
                                  color: "#4f76b9",
                                }}
                              >
                                <FiEdit3 />
                              </Link>
                              <QuestionStatus data={data.id} />
                              <span
                                // onClick={()=>setStatus('approved')}
                                className="px-3 py-2 rounded-2"
                                style={{
                                  backgroundColor: "rgb(234 255 242)",
                                  color: "rgb(38 183 96)",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#confirmationModal"
                              >
                                <FaCheck />
                              </span>
                              <QuestionStatus data={data.id} />

                              <span
                                // onClick={()=>setStatus('rejected')}
                                className=" px-3 py-2 rounded-2"
                                style={{
                                  backgroundColor: "rgb(255 240 240)",
                                  color: "rgb(255 72 72)",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#confirmationModal1"
                              >
                                <i class="fa-solid fa-xmark"></i>
                              </span>
                              <QuestionReject data={data.id} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            : !loader && (
                <h1 className="text-center p-5">Data Not Available</h1>
              )}
          {loader && (
            <CirclesWithBar
              height="150"
              width="150"
              color="#4fa94d"
              outerCircleColor="#4fa94d"
              innerCircleColor="#4fa94d"
              barColor="#4fa94d"
              ariaLabel="circles-with-bar-loading"
              wrapperStyle={{}}
              wrapperClass=" justify-content-center p-5"
              visible={true}
            />
          )}
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <button
              className={` btn active ${currentQue === 0 && "disable-btn"}`}
              disabled={currentQue === 0}
              onClick={() => handleSubAndQue(currentQue - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className={` btn active ${
                currentQue + 1 === allQuestion.length && "disable-btn"
              }`}
              disabled={currentQue + 1 === allQuestion.length}
              onClick={() => handleSubAndQue(currentQue + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default QuestionReview;
