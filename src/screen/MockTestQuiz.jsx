import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";
import "../assets/styles/MockTest.css";
let mockTest_id = "671b2c6f0383db0a5cdd90a7";
function MockTestQuiz() {
  const [subId, setSubId] = useState(null);
  const [data, setData] = useState({});
  const [subjectQuestions, setSubjectQuestion] = useState([]);
  const [subSelectedOption, setSubSelectedOption] = useState([]);
  const [currentQue, setCurrentQue] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  // mockTest_id=67000a073f382a89862e47cb&subject_id=66daad11174a1e8269c22f7d
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcxYTUwZThmZDU0NmQ3MmNmYjhmZDhjIiwiaWF0IjoxNzI5ODMzNDIyLCJleHAiOjE3Mjk5MTk4MjJ9.ECGvGtXdUZZRhZjuM11ozG_0HT4NE15ehxPhjp38Z44";
  const url = process.env.REACT_APP_API_URL;
  const handleQuizQuestions = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.13:5003/mockTest/getAllQuestionById/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            mockTest_id: mockTest_id,
            subject_id: subId,
          },
        }
      );
      if (result.status === 200) {
        setData(result.data.data);
        //set active subject
        setSubId(subId ? subId : result.data.data.subjects[0]?.subjectId);
        setSubjectQuestion(result.data.data.subjectQuestions);
        const flat = result.data.data.subjectQuestions?.flatMap(
          (item, mainIndex) => item.questions.map((value, index) => value)
        );
        setAllQuestions(flat);
      }
    } catch (error) {
      toast.error(error.response.data.messege);
    }
  };
  useEffect(() => {
    if (mockTest_id) {
      handleQuizQuestions();
    }
  }, []);

  const handleClickSubject = (sub, i) => {
    setSubId(sub.subjectId);
    setCurrentSub(i);
    setCurrentQue(0);
  };

  const handleSubAndQue = (i) => {
    try {
      if (
        subjectQuestions[currentSub].questions.length === i &&
        currentSub === data.subjects.length - 1
      ) {
        toast.error("No Questions");
      } else if (subjectQuestions[currentSub].questions.length - 1 < i) {
        setCurrentSub(currentSub + 1);
        setCurrentQue(0);
        setSubId(subjectQuestions[currentSub + 1].subjectId);
      } else if (i < 0) {
        setCurrentSub(currentSub - 1);
        setCurrentQue(subjectQuestions[currentSub - 1].questions.length - 1
        );
        setSubId(subjectQuestions[currentSub - 1].subjectId);
      } else {
        setCurrentQue(i);
      }
    } catch (error) {
      console.log(error);
    }
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
            alt="Content Image"
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
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return { hours, minutes, remainingSeconds };
  };
  const handleOptions = (questionId, i) => {
    // console.log(selectedOption);
    const selIndex = selectedOption.findIndex((option) => option.questionId === questionId);
    if (selIndex !== -1) {
      if (selectedOption[selIndex].index === i) {
        const updatedOption = selectedOption.filter(
          (option, index) => index !== selIndex
        ); 
        setSelectedOption(updatedOption);
      } else {
        const updatedOption = [...selectedOption];
        updatedOption[selIndex].index = i;
        setSelectedOption(updatedOption);
      }
    } else {
      setSelectedOption([
        ...selectedOption,
        { questionId: questionId, index: i }
      ]);
    }
  };
const handleSubOptions=(questionId,subQuestionId,optIndex)=>{
  const selIndex = subSelectedOption.findIndex((option) => option.subQuestionId === subQuestionId);
  console.log(subSelectedOption,selIndex);
  if (selIndex !== -1) {
    if (selectedOption[selIndex].index === optIndex) {
      const updatedOption = subSelectedOption.filter(
        (option, index) => index !== selIndex
      );
      setSelectedOption(updatedOption);
    } else {
      const updatedOption = [...subSelectedOption];
      updatedOption[selIndex].index = optIndex;
      setSelectedOption(updatedOption);
    }
  } else {
    setSubSelectedOption([
      ...subSelectedOption,
      { questionId: questionId,subQuestionId: subQuestionId,index:optIndex }
    ]);
  }
  
}
  const time = formatTime(timeLeft);

  return (
    <MainLayout>
      <div className="row">
        <div className="text-start fs-5 fw-bold ">{data.mockTestName}</div>
        <div className="col-sm-7 col-md-8 col-lg-8 ">
          <nav className="navbar navbar-expand navbar-light py-3">
            <div className="">
              <div>
                <ul className="navbar-nav fw-medium">
                  {data?.subjects?.map((sub, index) => {
                    return (
                      <li className="nav-item p-2" key={index}>
                        <Link
                          className={`nav-link rounded-2 p-2 ${
                            subId === sub.subjectId ? "active" : ""
                          }`}
                          aria-current="page"
                          to=""
                          onClick={() => handleClickSubject(sub, index)}
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
          <div className=" text-start fw-bold">Question {currentQue + 1}</div>
          <hr />

          {subjectQuestions?.map((item, index) => (
            <div>
              {item.questions?.map((que, qIndex) => (
                <div className="text-start">
                {/* main question */}
                  {subId === que.subjectId && qIndex === currentQue
                    ? parse(que.question, options)
                    : ""}
                    {/* main Option */}
                  {subId === que.subjectId && qIndex === currentQue
                    ? que.options?.map((option, optIndex) => (
                        <div
                          className="form-check py-1 d-flex justify-content -start"
                          key={optIndex}
                        >
                          <label className="form-check-label d-flex align-items-start">
                            <label className="checkbox-wrapper ">
                                <input
                                  type="checkbox"  
                                  checked={selectedOption.some((option)=>option.questionId===que.questionId&&option.index === optIndex)}
                                  onChange={() =>handleOptions(que.questionId,optIndex)} 
                                />
                            </label>
                            {
                              <label className="d-flex justify-content-start align-items-start text-start">
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
                        </div>
                      ))
                    : ""}
                    {/* print sub question  */}
                  {subId === que.subjectId && qIndex === currentQue
                    ? que.subQuestions?.map((sub, subIndex) => {
                        return (
                          <div key={subIndex}>
                            <div className="d-flex justify-content-start">
                              <label className="fw-bold">
                                {" "}
                                {subIndex + 1}.
                              </label>
                              <div className=" text-start">
                                {parse(sub.question, options)}
                              </div>
                            </div>
                            {/* sub Options */}
                            {sub.options?.map((option, optIndex) => (
                              <div
                                className="form-check py-1 d-flex justify-content -start"
                                key={optIndex}
                              >
                                <label className="form-check-label d-flex align-items-start">
                                  <label className="checkbox-wrapper ">
                                    <input
                                     type="checkbox"
                                     onClick={()=>handleSubOptions(que.questionId,sub.subQuestionId,optIndex)}
                                      />
                                  </label>
                                  {
                                    <label className="d-flex justify-content-start align-items-start text-start">
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
                              </div>
                            ))}
                          </div>
                        );
                      })
                    : ""}
                </div>
              ))}
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <button
              className=" btn active"
              disabled={currentQue === 0 && currentSub === 0}
              onClick={() => handleSubAndQue(currentQue - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className=" btn active"
              onClick={() => handleSubAndQue(currentQue + 1)}
            >
              Next
            </button>
          </div>
        </div>
        <div className="col-sm-5 col-md-4 col-lg-4 pt-4">
          <div className=" text-start p-3 bg-secondary-subtle right-side rounded-4 h-100">
            <div
              className="rounded-4 p-2 text-light"
              style={{ backgroundColor: "#1a1a97" }}
            >
              <i class="fa-regular fa-clock"></i>{" "}
              <label className=" fw-medium">Time Left </label>
              <div className="d-flex gap-4 time ">
                <div>
                  <div className="fs-2 fw-medium time">
                    {10 > time.hours ? "0" + time.hours : time.hours}
                  </div>
                  <span>Hours</span>
                </div>
                <div>
                  <div className="fs-2 fw-medium time">
                    {10 > time.minutes ? "0" + time.minutes : time.minutes}
                  </div>
                  <span>Minute</span>
                </div>
                <div>
                  <div className="fs-2 fw-medium time">
                    {10 > time.remainingSeconds
                      ? "0" + time.remainingSeconds
                      : time.remainingSeconds}
                  </div>
                  <span>Seconds</span>
                </div>
              </div>
            </div>

            <div className="py-4 d-flex justify-content-start align-items-start flex-wrap gap-3">
              {allQuestions?.map((item, index) => {
                return subId === item.subjectId ? (
                  <button className={`${selectedOption.some((option)=>option.questionId===item.questionId)?'btn-success':'active'} btn  px-3`} key={index}>
                    {index + 1}
                  </button>
                ) : (
                  ""
                );
              })}
            </div>

            <hr />
            <div className="py-2">
              <span className="badge bg-success rounded-5 ">&nbsp;</span> &nbsp;
              Answered
            </div>
            <div className="py-2">
              <span className="badge active rounded-5 ">&nbsp;</span> &nbsp; Not
              Answered
            </div>
            <div className="py-2 pb-5">
              <span className="badge bg-secondary rounded-5 ">&nbsp;</span>{" "}
              &nbsp; Not View
            </div>
            <div className="text-end">
              <button className="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </MainLayout>
  );
}

export default MockTestQuiz;