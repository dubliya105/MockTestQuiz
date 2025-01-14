/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import MainLayout from "../components/MainLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoMdAdd } from "react-icons/io";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import SubQuestionsEdit from "./SubQuestionsEdit";

function QusetionEdit() {
  const[progress,setProgress]=useState(25);
  const [question, setQuestion] = useState(null);
  const [optionA, setOptionA] = useState(null);
  const [optionB, setOptionB] = useState(null);
  const [optionC, setOptionC] = useState(null);
  const [optionD, setOptionD] = useState(null);
  const [solution, setSolution] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const {questionData} = location.state;
  useEffect(() => {
    if(questionData.type_of_question === "General"){
      setProgress(50);
    }
    setQuestion(questionData.question);
    setOptionA(questionData.options[0]);
    setOptionB(questionData.options[1]);
    setOptionC(questionData.options[2]);
    setOptionD(questionData.options[3]);
    setSolution(questionData.solution);
    setCorrectOption(questionData.correctOption);
  }, [questionData]);
  const toolbar = [
    "removeFormat",
    "|",
    "heading",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "link",
    "blockQuote",
    "code",
    "codeBlock",
    "numberedList",
    "bulletedList",
    "outdent",
    "indent",
    "imageUpload",
    "mediaEmbed",
    "insertTable",
    "undo",
    "redo",
    "alignment",
    "fontSize",
    "fontFamily",
    "fontColor",
    "highlight",
    "specialCharacters",
    "horizontalLine",
  ];

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: () => {
          return loader.file.then((file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64String = reader.result;
                const imageElement = `<img src="${base64String}" alt="Uploaded Image"/>`;

                setDetails((prevDetails) => prevDetails + imageElement);

                resolve({
                  default: base64String,
                });
              };
              reader.onerror = (error) => reject(error);
              reader.readAsDataURL(file);
            });
          });
        },
        abort: () => {},
      };
    };
  }
  const handleEditorChange = (event, editor) => {
    // setQuestion(editor.getData());
  };
  return (
    <MainLayout>
      <div className="text-start d-flex justify-content-between py-3 ">
        <h4 className="text-truncate"> Question Bank Review</h4>
        <div className="d-flex text-truncate">
          <label className=" "> Dashboard {">"}</label>
          <Link to="" className=" text-decoration-none text-truncate">
            Question Bank
          </Link>
        </div>
      </div>
      <div className="bg-light p-4">
        <h3 className="text-start">Add Question</h3>
        <div className="p-3 pt-5" >
          <ProgressBar percent={(progress===25||progress===50) && 50} filledBackground="rgb(10, 10, 163)">
            <Step transition="scale"  >
              {({ accomplished }) => (
                <div
                onClick={()=>navigate('/QuestionReview')}
                  className={`rounded-circle ${
                    accomplished ? "active-page" : "de-active"
                  } p-3`}
                >
                  ✓
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
        {
          // Type of Question : Match
          questionData.type_of_question === "Poem" || questionData.type_of_question === 'Comprehensive' ? ( // Type of Question : comprensive&&poem
            <div className="text-start py-4">
            {progress===25&& <div>
              <p>
              Parent Question <span style={{ color: "red" }}>*</span>
            </p>
            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                language: "en",
                toolbar: toolbar,
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "imageStyle:full",
                    "imageStyle:side",
                  ],
                },
                fontSize: {
                  options: [10, 12, 14, 16, 18],
                },
                wordCount: {
                  showWordCount: true,
                  showCharCount: true,
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                  ],
                },
                fontFamily: {
                  options: ["default", "Arial", "Courier", "Comic Sans MS"],
                },
              }}
              editor={ClassicEditor}
              data={question}
              onChange={handleEditorChange}
            />
            <div className="d-flex justify-content-end py-3">
            <div className="btn-group mx-2" onClick={()=>setProgress(50)}>
            <button
              className="btn btn-primary px-2 w-100"
              style={{ backgroundColor: "rgb(19, 19, 191)" }}
            >
              Next
            </button>
            <button className="btn btn-primary px-2">
            <FaArrowRightLong />
            </button>
          </div>
            </div>
           
            </div>}
            {
             progress===50&&<SubQuestionsEdit setProgress={setProgress} questionId={questionData.id}/>
            }
            </div>
            
            ):(
              <div>
          <div className="text-start py-4">
            <p>
              Question <span style={{ color: "red" }}>*</span>
            </p>
            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                language: "en",
                toolbar: toolbar,
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "imageStyle:full",
                    "imageStyle:side",
                  ],
                },
                fontSize: {
                  options: [10, 12, 14, 16, 18],
                },
                wordCount: {
                  showWordCount: true,
                  showCharCount: true,
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                  ],
                },
                fontFamily: {
                  options: ["default", "Arial", "Courier", "Comic Sans MS"],
                },
              }}
              editor={ClassicEditor}
              data={question}
              onChange={handleEditorChange}
            />
            <div>
              Option A <span style={{ color: "red" }}>*</span>
            </div>

            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                language: "en",
                toolbar: toolbar,
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "imageStyle:full",
                    "imageStyle:side",
                  ],
                },
                fontSize: {
                  options: [10, 12, 14, 16, 18],
                },
                wordCount: {
                  showWordCount: true,
                  showCharCount: true,
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                  ],
                },
                fontFamily: {
                  options: ["default", "Arial", "Courier", "Comic Sans MS"],
                },
              }}
              editor={ClassicEditor}
              data={optionA}
              onChange={handleEditorChange}
            />
            <div>
              Option B <span style={{ color: "red" }}>*</span>
            </div>
            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                language: "en",
                toolbar: toolbar,
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "imageStyle:full",
                    "imageStyle:side",
                  ],
                },
                fontSize: {
                  options: [10, 12, 14, 16, 18],
                },
                wordCount: {
                  showWordCount: true,
                  showCharCount: true,
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                  ],
                },
                fontFamily: {
                  options: ["default", "Arial", "Courier", "Comic Sans MS"],
                },
              }}
              editor={ClassicEditor}
              data={optionB}
              onChange={handleEditorChange}
            />
            <div>
              Option C <span style={{ color: "red" }}>*</span>
            </div>

            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                language: "en",
                toolbar: toolbar,
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "imageStyle:full",
                    "imageStyle:side",
                  ],
                },
                fontSize: {
                  options: [10, 12, 14, 16, 18],
                },
                wordCount: {
                  showWordCount: true,
                  showCharCount: true,
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                  ],
                },
                fontFamily: {
                  options: ["default", "Arial", "Courier", "Comic Sans MS"],
                },
              }}
              editor={ClassicEditor}
              data={optionC}
              onChange={handleEditorChange}
            />
            <div>
              Option D <span style={{ color: "red" }}>*</span>
            </div>
            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                language: "en",
                toolbar: toolbar,
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "imageStyle:full",
                    "imageStyle:side",
                  ],
                },
                fontSize: {
                  options: [10, 12, 14, 16, 18],
                },
                wordCount: {
                  showWordCount: true,
                  showCharCount: true,
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                  ],
                },
                fontFamily: {
                  options: ["default", "Arial", "Courier", "Comic Sans MS"],
                },
              }}
              editor={ClassicEditor}
              data={optionD}
              onChange={handleEditorChange}
            />
          </div>
          <div
            className="text-start p-3 rounded-3"
            style={{
              backgroundColor: "rgb(185, 202, 249)",
              borderLeft: "3px solid rgb(10, 10, 163)",
            }}
          >
            Correct Option <span style={{ color: "red" }}>*</span>
            <select value={correctOption} className="form-select pt-2" name="" id="">
              <option value="" disabled>
                select correct option
              </option>
              <option value={0}>A</option>
              <option value={1}>B</option>
              <option value={2}>C</option>
              <option value={3}>D</option>
            </select>
          </div>
          <div className="text-start py-4">
            Solution
            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                language: "en",
                toolbar: toolbar,
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "imageStyle:full",
                    "imageStyle:side",
                  ],
                },
                fontSize: {
                  options: [10, 12, 14, 16, 18],
                },
                wordCount: {
                  showWordCount: true,
                  showCharCount: true,
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                  ],
                },
                fontFamily: {
                  options: ["default", "Arial", "Courier", "Comic Sans MS"],
                },
              }}
              editor={ClassicEditor}
              data={solution}
              onChange={handleEditorChange}
            />
          </div>
               </div>)
        }
{
  progress===50&& <div className=" d-flex justify-content-between py-3">
          <button className="btn text-primary">
            <FaArrowLeftLong /> &nbsp; Back
          </button>
          <div className="btn-group mx-2">
            <button
              className="btn btn-primary px-2 w-100"
              style={{ backgroundColor: "rgb(19, 19, 191)" }}
            >
              Submit
            </button>
            <button className="btn btn-primary px-2">
              <IoMdAdd />
            </button>
          </div>
        </div>
}

       
      </div>
    </MainLayout>
  );
}

export default QusetionEdit;
