import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import "../assets/styles/MockTest.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoBulbSharp } from "react-icons/io5";
import { CirclesWithBar } from "react-loader-spinner";
import parse from "html-react-parser";
export default function MockTest() {
  const [data, setData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [show, setShow] = useState("");
  const [showSub, setShowSub] = useState("");
  const [subId, setSubId] = useState(null);
  const [loeder, setLoeder] = useState(false);
  const url = process.env.REACT_APP_API_URL;

  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMzMTE4Njc2LCJleHAiOjE3MzMyMDUwNzZ9.ZPtIL_8HEMdTBosltfopmYF3M5raXPWONN0BhwT7eCk";
 const hendleGetData = async () => {
    try {
      setLoeder(true);
      const result = await axios.get( 
       "http://192.168.0.21:5003/mockTest/viewResult",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            mockTest_id:'67000a073f382a89862e47cb',
            mockTestSubmissions_id:'670d11801c7b3db481d25cbd',
            subject_id: subId,
          },
        }
      );
      if (result.status === 200) {
        //set all data
        setData(result.data.data);
        //set active subject
        setSubId(subId ? subId : result.data.data.subjects[0]?.subjectId);
        // set select subject details
        setSelectedSubject(
          selectedSubject ? selectedSubject : result.data.data.subjects[0]
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoeder(false);
    }
  };

  useEffect(() => {
    hendleGetData();
  }, [subId]); //runs when subId changes

  const handleClickSubject = (sub) => {
    // click subject and set data in states
    setSelectedSubject(sub);
    setSubId(sub.subjectId);
  };
  const handleToggle = (index) => {
    setShow((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the specific index
    }));
  };

  const handleToggleSub = (index) => {
    setShowSub((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the specific index
    }));
  };

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
            className="emded"
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
      <div className="">
        <div className="text-start fs-5 fw-bold pb-3   ">
          Barat SAT Exam & 3 Mock Test
        </div>
        <div className="bg-light rounded-3 p-3 shadow-mainbox pt-3">
          {/* show all subject Performance */}
          <div className="text-start fw-bold ">
            <div className="text-start text-primary">
              My Overall Performance Summery
            </div>
            <div className="row d-flex align-items-start p-3 ">
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                  <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
                </div>
                <div className="text-start px-3">
                  <h5 className="p-0 m-0  ">
                    {data.score}/{data.totalMarks}
                  </h5>
                  <span
                    className="text-muted fw-normal"
                    style={{ fontSize: "12px" }}
                  >
                    Marks
                  </span>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                  <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
                </div>
                <div className="text-start px-3">
                  <h5 className="p-0 m-0  ">
                    {data.totalAttemptQuestions}/{data.totalQuestions}
                  </h5>
                  <span
                    className="text-muted fw-normal"
                    style={{ fontSize: "12px" }}
                  >
                    Attempted
                  </span>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                  <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
                </div>
                <div className="text-start px-3">
                  <h5 className="p-0 m-0  ">
                    {data.totalCorrectQuestions}/{data.totalQuestions}
                  </h5>
                  <span
                    className="text-muted fw-normal"
                    style={{ fontSize: "12px" }}
                  >
                    Correct
                  </span>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                  <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
                </div>
                <div className="text-start px-3">
                  <h5 className="p-0 m-0  ">
                    {data.totalIncorrectQuestions}/{data.totalQuestions}
                  </h5>
                  <span
                    className="text-muted fw-normal"
                    style={{ fontSize: "12px" }}
                  >
                    Incorrect
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* show total time deurestion */}
          <div className="text-start  ">
            <div className="text-start text-primary">Total Time Taken</div>
            <div className="row d-flex align-items-center p-3 ">
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                  <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
                </div>
                <div className="text-start px-3">
                  <span
                    className="text-muted fw-normal"
                    style={{ fontSize: "13px" }}
                  >
                    hh:mm:ss
                  </span>
                  <div>
                    <h5 className="p-0 m-0  ">{data.startTime}</h5>
                    <span className="text-muted " style={{ fontSize: "13px" }}>
                      Start Time
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                  <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
                </div>
                <div className="text-start px-3">
                  <span className="text-muted" style={{ fontSize: "13px" }}>
                    hh:mm:ss
                  </span>
                  <div>
                    <h5 className="p-0 m-0">{data.endTime}</h5>
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                      End Time
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                  <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
                </div>
                <div className="text-start px-3">
                  <span className="text-muted" style={{ fontSize: "13px" }}>
                    hh:mm:ss
                  </span>
                  <h5 className="p-0 m-0  ">{data.submittedTime}</h5>
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Time Tekon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* show subjects name  */}
        <div>
          <nav className="navbar navbar-expand navbar-light py-3">
            <div className="container-fluid">
              <div>
                <ul className="navbar-nav fw-medium">
                  {data.subjects?.map((sub, index) => {
                    return (
                      <li className="nav-item px-2 py-3" key={index}>
                        <Link
                          className={`nav-link rounded-2 px-3 py-2 ${
                            subId === sub.subjectId ? "active" : ""
                          }`}
                          aria-current="page"
                          to=""
                          onClick={() => handleClickSubject(sub)}
                        >
                          {sub.subjectName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* show selected subject details  */}
        <div className="text-start fw-bold bg-light p-3 rounded-3 shadow-mainbox">
          <div className="text-start text-primary">Total Time Taken</div>
          <div className="row d-flex align-items-center pt-3 px-3 ">
            <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
              <div className=" text-start text-light ">
                <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
              </div>
              <div className="text-start px-3">
                <h5 className="p-0 m-0  ">
                  {selectedSubject?.score}/{selectedSubject?.totalQuestions * 2}
                </h5>
                <span
                  className="text-muted fw-normal"
                  style={{ fontSize: "12px" }}
                >
                  Marks
                </span>
              </div>
            </div>
            <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
              <div className=" text-start text-light ">
                <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
              </div>
              <div className="text-start px-3">
                <h5 className="p-0 m-0  ">
                  {selectedSubject?.attemptedQuestions}/
                  {selectedSubject?.totalQuestions}
                </h5>
                <span
                  className="text-muted fw-normal"
                  style={{ fontSize: "12px" }}
                >
                  Attempted
                </span>
              </div>
            </div>
            <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
              <div className=" text-start text-light ">
                <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
              </div>
              <div className="text-start px-3">
                <h5 className="p-0 m-0  ">
                  {selectedSubject?.correctQuestions}/
                  {selectedSubject?.totalQuestions}
                </h5>
                <span
                  className="text-muted fw-normal"
                  style={{ fontSize: "12px" }}
                >
                  Correct
                </span>
              </div>
            </div>
            <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
              <div className=" text-start text-light ">
                <i className="fa-solid fa-bell rounded-5 bg-success p-3"></i>
              </div>
              <div className="text-start px-3">
                <h5 className="p-0 m-0  ">
                  {selectedSubject?.incorrectQuestions}/
                  {selectedSubject?.totalQuestions}
                </h5>
                <span
                  className="text-muted fw-normal"
                  style={{ fontSize: "12px" }}
                >
                  Incorrect
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* show questions */}
        {loeder ? (
          <div className="text-center p-5">
            <CirclesWithBar
              height="100"
              width="100"
              color="#4fa94d"
              outerCircleColor="#4fa94d"
              innerCircleColor="#4fa94d"
              barColor="#4fa94d"
              ariaLabel="circles-with-bar-loading"
              wrapperStyle={{}}
              wrapperclassName=""
              visible={true}
            />
          </div>
        ) : (
          <div className=" pt-5">
            {data.questions?.map((data, index) => {
              return (
                <div>
                  {
                    <div className=" text-start" key={index}>
                      <div
                        className="card-body px-3"
                        style={{
                          backgroundColor: "#e4e6eb",
                          "--bs-card-border-color": "transparent",
                        }}
                      >
                        {/* show question attempted or not   */}
                        <p className="">
                          <strong>
                            Question {index + 1}
                            {data.subQuestions.length ? (
                              ""
                            ) : data.selectedOption !== null ? (
                              data.correctOption === data.selectedOption ? (
                                <label
                                  className="ps-1"
                                  style={{ color: "rgb(84 231 86)" }}
                                >
                                  (+2 Marks)
                                </label>
                              ) : (
                                <label className=" text-danger ps-1">
                                  {" "}
                                  (0.5 Marks)
                                </label>
                              )
                            ) : (
                              <label className=" text-danger ps-1">
                                {" "}
                                Not Answered
                              </label>
                            )}
                          </strong>
                        </p>

                        <div className="fw-medium">
                          {parse(data.question, options)}
                        </div>
                        {/* show Subquestions */}
                        {data.subQuestions?.map((quest, indexSub) => {
                          return (
                            <div className=" text-start" key={indexSub}>
                              <div
                                className="card-body "
                                style={{
                                  backgroundColor: "#e4e6eb",
                                  "--bs-card-border-color": "transparent",
                                }}
                              >
                                <p className="">
                                  <strong className="">
                                    Question {indexSub + 1}
                                    {quest.selectedOption !== null ? (
                                      quest.correctOption ===
                                      quest.selectedOption ? (
                                        <label
                                          className="ps-1"
                                          style={{ color: "rgb(84 231 86)" }}
                                        >
                                          (+2 Marks)
                                        </label>
                                      ) : (
                                        <label className="ps-1 text-danger ">
                                          (0.5 Marks)
                                        </label>
                                      )
                                    ) : (
                                      <label className="ps-1 text-danger ">
                                        Not Answered
                                      </label>
                                    )}
                                  </strong>
                                </p>
                                {/* <p>{quest.question.replace(/<[^>]*>/g, "")}</p> */}
                                {/* {quest.question.match(/([^">]+\.(jpg|png|svg|jfif))/)?<img src={findImageFromApi(quest.question.match(/([^">]+\.(jpg|png|svg|jfif))/))} alt="cxdfx" />:''} */}
                                <div className=" fw-medium">
                                  {parse(quest.question, options)}
                                </div>
                                <form>
                                  {quest.options?.map((option, optIndex) => (
                                    <div
                                      className="form-check py-1 d-flex justify-content-md-start"
                                      key={optIndex}
                                    >
                                      <label className="form-check-label d-flex align-items-center">
                                        <label className="checkbox-wrapper ">
                                          {/* correct Answer */}
                                          {quest.correctOption === optIndex ? (
                                            <input
                                              className="custom-icon-checkbox"
                                              type="checkbox"
                                              checked={true}
                                              name={`question${quest.questionId}`}
                                              id={`option${optIndex}${quest.questionId}`}
                                            />
                                          ) : (
                                            ""
                                          )}
                                          {/* incorrect Answer */}
                                          {quest.correctOption !== optIndex &&
                                          optIndex === quest.selectedOption ? (
                                            <input
                                              className="custom-icon-checkbox"
                                              type="checkbox"
                                              checked={false}
                                              name={`question${quest.questionId}`}
                                              id={`option${optIndex}${quest.questionId}`}
                                            />
                                          ) : (
                                            ""
                                          )}
                                          {/* show boxes wrong or right */}
                                          {quest.correctOption !== optIndex &&
                                          optIndex === quest.selectedOption ? (
                                            <span className="checkbox-icon"></span>
                                          ) : quest.correctOption ===
                                            optIndex ? (
                                            <span className="checkbox-icon"></span>
                                          ) : (
                                            <span className="empty"></span>
                                          )}
                                        </label>
                                        {/* show options  */}

                                        {
                                          <label
                                            className={
                                              quest.correctOption === optIndex
                                                ? "correct-option"
                                                : ""
                                            }
                                          >
                                            {String.fromCharCode(65 + optIndex)}
                                            .&nbsp;
                                            {option
                                              .replace(/<[^>]*>/g, "")
                                              .replace(/&nbsp;/g, " ")}
                                          </label>
                                        }
                                      </label>

                                      <div className=" fst-italic fw-medium ">
                                        {/* check correct answer */}
                                        {optIndex === quest.correctOption &&
                                        optIndex === quest.selectedOption ? (
                                          <label style={{ color: "#22e822" }}>
                                            &nbsp; your Answer
                                          </label>
                                        ) : optIndex === quest.correctOption ? (
                                          <label style={{ color: "#22e822" }}>
                                            &nbsp; Correct Answer
                                          </label>
                                        ) : (
                                          ""  
                                        )}
                                        {/* check incorrect Answer */}
                                        {quest.correctOption !== optIndex &&
                                          optIndex === quest.selectedOption && (
                                            <label style={{ color: "red" }}>
                                              &nbsp; Incorrect Answer
                                            </label>
                                          )}
                                      </div>
                                    </div>
                                  ))}
                                </form>
                              </div>
                              {quest.solution ? (
                                <div>
                                  <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                                    <IoBulbSharp
                                      className="fw-bold"
                                      style={{ color: "#F6821F" }}
                                    />
                                    &nbsp; Solution &nbsp;{" "}
                                    <Link
                                      onClick={() =>
                                        handleToggleSub(quest.subQuestionId)
                                      }
                                      className=" fw-bold fst-italic"
                                      data-bs-toggle="collapse"
                                      to={`#collapseExample${quest.subQuestionId}`}
                                      role="button"
                                      aria-expanded="false"
                                      aria-controls={`collapseExample${quest.subQuestionId}`}
                                      style={{ color: "#F6821F" }}
                                    >
                                      {showSub[quest.subQuestionId]
                                        ? "Hide"
                                        : "Show"}
                                    </Link>
                                  </button>

                                  <div
                                    className="collapse"
                                    id={`collapseExample${quest.subQuestionId}`}
                                  >
                                    <div className="ps-3 card-body">
                                      {/* {quest.solution.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ") } */}
                                      {parse(quest.solution, options)}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <hr />
                            </div>
                          );
                        })}
                        {/* show option  */}
                        <form>
                          {data.options?.map((option, optIndex) => (
                            <div
                              className="form-check py-1 d-flex  justify-content-md-start"
                              key={optIndex}
                            >
                              <label className="form-check-label d-flex align-items-center">
                                <label className="checkbox-wrapper pe-2">
                                  {/* correct Answer */}
                                  {data.correctOption === optIndex ? (
                                    <input
                                      className="custom-icon-checkbox"
                                      type="checkbox"
                                      checked={true}
                                      name={`question${data.questionId}`}
                                      id={`option${optIndex}${data.questionId}`}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {/* incorrect Answer */}
                                  {data.correctOption !== optIndex &&
                                  optIndex === data.selectedOption ? (
                                    <input
                                      className="custom-icon-checkbox"
                                      type="checkbox"
                                      checked={false}
                                      name={`question${data.questionId}`}
                                      id={`option${optIndex}${data.questionId}`}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {/* show boxes wrong or right */}
                                  {data.correctOption !== optIndex &&
                                  optIndex === data.selectedOption ? (
                                    <span className="checkbox-icon"></span>
                                  ) : data.correctOption === optIndex ? (
                                    <span className="checkbox-icon"></span>
                                  ) : (
                                    <span className="empty"></span>
                                  )}
                                </label>
                                {
                                  <label
                                    className={`${
                                      data.correctOption === optIndex
                                        ? "correct-option"
                                        : ""
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
                                {optIndex === data.correctOption &&
                                optIndex === data.selectedOption ? (
                                  <label style={{ color: "#22e822" }}>
                                    &nbsp; your Answer
                                  </label>
                                ) : optIndex === data.correctOption ? (
                                  <label style={{ color: "#22e822" }}>
                                    &nbsp; Correct Answer
                                  </label>
                                ) : (
                                  ""
                                )}
                                {/* check incorrect Answer */}
                                {data.correctOption !== optIndex &&
                                  optIndex === data.selectedOption && (
                                    <span style={{ color: "red" }}>
                                      &nbsp; Incorrect Answer
                                    </span>
                                  )}
                              </div>
                            </div>
                          ))}
                        </form>
                        {/* solution hide and show  */}
                        {data.typeOfQuestion === "General" ? (
                          data.solution !== "" ? (
                            <div>
                              <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                                <IoBulbSharp
                                  className="fw-bold"
                                  style={{ color: "#F6821F" }}
                                />
                                &nbsp; Solution &nbsp;{" "}
                                <Link
                                  onClick={() => handleToggle(data.questionId)}
                                  className=" fw-bold fst-italic"
                                  data-bs-toggle="collapse"
                                  to={`#collapseExample${data.questionId}`}
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls={`collapseExample${data.questionId}`}
                                  style={{ color: "#F6821F" }}
                                >
                                  {show[data.questionId] ? "Hide" : "Show"}
                                </Link>
                              </button>

                              <div
                                className="collapse"
                                id={`collapseExample${data.questionId}`}
                              >
                                <div className="ps-3 card-body">
                                  {/* {data.solution?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ") || "No solution provided."} */}
                                  {parse(data.solution, options)}
                                </div>
                              </div>
                              <hr />
                            </div>
                          ) : (
                            <hr />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
