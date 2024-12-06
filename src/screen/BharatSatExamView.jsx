import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { FaArrowRightLong } from "react-icons/fa6";
import parse from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";
import generatePDF from 'react-to-pdf';
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMzNDY0NDMxLCJleHAiOjE3MzM1NTA4MzF9.e_qwxeFk2LEmxn8i8yDNgqNMdrIpR1epMU-q_SqKAK0";

export default function BharatSatExamView() {
  const { id } = useParams();
  const [subjectsData, setSubjectData] = useState([]);
  const [data, setData] = useState([]);
  const [subjectId, setSubjectId] = useState([]);
  const [subjectQuestions, setSubjectQuestions] = useState([]);
  const targetRef = useRef();
  const handleGetExamList = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.27:5003/bharatSat/bharatSat-question-paper",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            bharatSatExamId: id,
          },
        }
      );
      if (result.status === 200) {
        setSubjectData(result.data.data.subjects);
        setSubjectQuestions(result.data.data.subjectQuestions[0]);
        setSubjectId(result.data.data.subjects[0].subjectId);
        setData(result.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    handleGetExamList();
  }, []);

  const handleClickSubject = (sub) => {
    setSubjectId(sub.subjectId);
    setSubjectQuestions(
      data.subjectQuestions.find((item) => item.subjectId === sub.subjectId)
    );
  };

//   const generatePDF = () => {
  
//     const doc = new jsPDF();
  
//     // PDF content ko yahan likhen
//     doc.text("User Data PDF", 10, 10);
    
   
  
//     doc.text(`Name:${subjectQuestions.subjectId}`, 10, 20);
   
//     // PDF ko naye tab me open karna
//     const pdfData = doc.output('blob');
//     const pdfURL = URL.createObjectURL(pdfData);
//     window.open(pdfURL, "_blank");
//   }

  return (
    <MainLayout>
      <div className="text-start d-flex justify-content-between">
        <h4>BHARAT SAT</h4>
        <div className="d-flex">
          <p>Dashboard</p>
          <Link to="">-BHARAT SAT</Link>
        </div>
      </div>
      <div className=" bg-light">
        <div className="d-flex justify-content-between align-items-center pt-3 px-3">
          <h5>Qusetion Paper</h5>
          <div className="btn-group px-2" onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})}>
            <button
              className="btn btn-primary px-2 w-100"
              style={{ backgroundColor: "rgb(19, 19, 191)" }}
            >
              Export
            </button>
            <button className="btn btn-primary px-2">
              <FaArrowRightLong />
            </button>
          </div>
        </div>
        <nav className="navbar navbar-expand navbar-light py-3">
          <div className="container-fluid">
            <div>
              <ul className="navbar-nav fw-medium">
                {subjectsData?.map((sub, index) => {
                  return (
                    <li className="nav-item px-2" key={index}>
                      <Link
                        className={`nav-link rounded-2 px-3 py-2 ${
                          subjectId === sub.subjectId ? "active-page text-light" : ""
                        }`}
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
        <div ref={targetRef}>.
          {subjectQuestions?.questions?.map((data, index) => {
            return (
              <div>
                {
                  <div className=" text-start pt-2" key={index}>
                    <div className="px-3">
                      <p className="">
                        <strong>Question {index + 1}</strong>
                      </p>
                      <hr />
                      <div className="fw-medium">{parse(data.question)}</div>
                      {/* show Subquestions */}
                      {data.subQuestions?.map((quest, indexSub) => {
                        return (
                          <div className=" text-start pt-2" key={indexSub}>
                            <div>
                            <div className=" fw-medium">
                                {indexSub+1}. <label>{parse(quest.question )}</label>
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
                                        {quest.correctOption === optIndex && (
                                          <input
                                            className="custom-icon-checkbox"
                                            type="checkbox"
                                            checked={true}
                                          />
                                        )}

                                        {quest.correctOption === optIndex ? (
                                          <span className="checkbox-icon"></span>
                                        ) : (
                                          <span className="empty"></span>
                                        )}
                                      </label>
                                      {
                                        <label
                                          className={
                                            quest.correctOption === optIndex &&
                                            "correct-option"
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
                  </div>
                }
              </div>
            );
          })}
        </div>
        <ToastContainer />
      </div>
    </MainLayout>
  );
}
