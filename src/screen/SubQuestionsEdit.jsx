import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiEdit2Line } from "react-icons/ri";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import parse from "html-react-parser";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzM2OTIwNzgxLCJleHAiOjE3MzcwMDcxODF9.OUTfXHjfMQ7EiBZR9XatVMmpDWH2LzdPUMPv8hZzheo";

export default function SubQuestionsEdit({ setProgress, questionId }) {
  const [details, setDetails] = useState(null);
  const [subQuestions, setSubQuestions] = useState([]);
  const [selectSubQuestion, setSelectSubQuestion] = useState({});
  const [selectSubQuestion1, setSelectSubQuestion1] = useState([
    {
      correctOption: 2,
      optionFour: "<p>Whether to choose a career</p>",
      optionOne: "<p>Whether to return home</p>",
      optionThree: "<p>Whether to take one road or the other</p>",
      optionTwo: "<p>Whether to travel on both roads</p>",
      question: "<p>What is the speaker's main dilemma in the poem?</p>",
      solution: "<p>aaa</p>",
      sub_question_id: "6773e9b41e9447682806592b",
    },
  ]);
  const [subQuestion, setSubQuestion] = useState("");
  const [subOptionOne, setSubOptionOne] = useState("");
  const [subOptionTwo, setSubOptionTwo] = useState("");
  const [subOptionThree, setSubOptionThree] = useState("");
  const [subOptionFour, setSubOptionFour] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [solution, setSolution] = useState(null);

  const handleSetData = (item) => {
    setSelectSubQuestion(item);
    setSubQuestion(item.question);
    setSubOptionOne(item.optionOne);
    setSubOptionTwo(item.optionTwo);
    setSubOptionThree(item.optionThree);
    setSubOptionFour(item.optionFour);
    setCorrectOption(item.correctOption);
    setSolution(item.solution);
  };

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
  const CustomUploadAdapterPluginFactory = (setState, index) => {
    return function CustomUploadAdapterPlugin(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return {
          upload: () => {
            return loader.file.then((file) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result;
                  const imageElement = `<img src="${base64String}" alt="Uploaded Image" />`;
console.log('Image uploaded for index:', index);

                  // Update the corresponding state based on the index
                  setState((prevDetails) => prevDetails + imageElement);

                  console.log(imageElement, 'Image uploaded for index:', index);

                  resolve({
                    default: base64String,
                  });
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file); // Read the file as base64
              });
            });
          },
          abort: () => {},
        };
      };
    };
  };
  
  const handleEditorChange = (editor, setData) => {
    setData(editor.getData());
  };
  async function handleGetSubQuestion() {
    try {
      const result = await axios.get(
        "http://192.168.0.21:5003/reviewer/sub-question-list",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          params: {
            question_id: questionId,
          },
        }
      );
      if (result.status === 200) {
        console.log(result.data);

        setSubQuestions(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetSubQuestion();
  }, []);
  return (
    <div>
      <div>
        <div className="text-start pt-4 ">
          <span>Parent Question</span>
          <div
            className="d-flex justify-content-between align-items-center rounded-2"
            style={{ backgroundColor: "rgb(185, 202, 249)" }}
          >
            <div
              className="px-2 text-truncate"
              style={{ color: "rgb(10, 10, 163)" }}
            >
              {subQuestions.parentQuestion}
            </div>
            <div className="p-1">
              <div
                className=" rounded-3 "
                style={{
                  backgroundColor: "rgb(10, 10, 163)",
                  padding: "8px 12px",
                }}
              >
                <RiEdit2Line
                  className="text-light"
                  onClick={() => setProgress(25)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-3 ">
        <div className="col-12 col-md-7 ">
          <div className="text-start py-2">
            <p>
              Question <span style={{ color: "red" }}>*</span>
            </p>
            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPluginFactory(setSubQuestion, 0)], // Pass `setState` and `index` dynamic
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
              data={subQuestion}
              onChange={(event, editor) => {
                handleEditorChange(editor, setSubQuestion);
              }}
            />
            <div>
              Option A <span style={{ color: "red" }}>*</span>
            </div>

            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPluginFactory(setSubOptionOne, 0)], // Pass `setState` and `index` dynamic

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
              data={subOptionOne}
              onChange={(event, editor) => {
                handleEditorChange(editor, setSubOptionOne);
              }}
            />
            <div>
              Option B <span style={{ color: "red" }}>*</span>
            </div>
            <CKEditor
              config={{
                extraPlugins: [CustomUploadAdapterPluginFactory(setSubOptionTwo, 0)], // Pass `setState` and `index` dynamic

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
              data={subOptionTwo}
              onChange={(event, editor) => {
                handleEditorChange(editor, setSubOptionTwo);
              }}
            />
            <div>
              Option C <span style={{ color: "red" }}>*</span>
            </div>

            <CKEditor
              config={{
                                extraPlugins: [CustomUploadAdapterPluginFactory(setSubOptionThree, 0)], // Pass `setState` and `index` dynamic

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
              data={subOptionThree}
              onChange={(event, editor) => {
                handleEditorChange(editor, setSubOptionThree);
              }}
            />
            <div>
              Option D <span style={{ color: "red" }}>*</span>
            </div>
            <CKEditor
              config={{
                                extraPlugins: [CustomUploadAdapterPluginFactory(setSubOptionFour, 0)], // Pass `setState` and `index` dynamic

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
              data={subOptionFour}
              onChange={(event, editor) => {
                handleEditorChange(editor, setSubOptionFour);
              }}
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
            <select
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              className="form-select pt-2"
              name=""
              id=""
            >
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
                                extraPlugins: [CustomUploadAdapterPluginFactory(setSolution, 0)], // Pass `setState` and `index` dynamic

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
              onChange={(event, editor) => {
                handleEditorChange(editor, setSolution);
              }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <div className="btn-group mx-2">
              <button
                className="btn btn-primary px-2 w-100"
                style={{ backgroundColor: "rgb(19, 19, 191)" }}
              >
                UpdateQuestion
              </button>
              <button className="btn btn-primary px-2">
                <IoMdAdd />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5 bg-secondary-subtle rounded-4 text-start">
          <h4 className="py-2">Questions</h4>
          {subQuestions.subQuestionList?.map((item, index) => (
            <div className="bg-light p-1 rounded-3 mt-2">
              <h6 className="py-2 px-1 d-flex">
                <span>{index + 1}.</span>
                {parse(item.question)}
              </h6>
              <div className="p-1 ">
                <div
                  className={`${
                    item.correctOption === 0
                      ? "bg-success text-white"
                      : "bg-secondary-subtle"
                  }  ps-4 d-flex align-items-center  `}
                >
                  <span>A &nbsp;</span>
                  {item.optionOne
                    .replace(/<[^>]*>/g, "")
                    .replace(/&nbsp;/g, " ")}
                </div>
              </div>
              <div className="p-1 ">
                <div
                  className={`${
                    item.correctOption === 1
                      ? "bg-success text-white "
                      : "bg-secondary-subtle"
                  } p-1 ps-4 d-flex`}
                >
                  <span>A &nbsp;</span>
                  {item.optionTwo
                    .replace(/<[^>]*>/g, "")
                    .replace(/&nbsp;/g, " ")}
                </div>
              </div>
              <div className="p-1 ">
                <div
                  className={`${
                    item.correctOption === 2
                      ? "bg-success text-white"
                      : "bg-secondary-subtle"
                  } p-1 ps-4 d-flex`}
                >
                  <span>A &nbsp;</span>
                  {item.optionThree
                    .replace(/<[^>]*>/g, "")
                    .replace(/&nbsp;/g, " ")}
                </div>
              </div>
              <div className="p-1 ">
                <div
                  className={`${
                    item.correctOption === 3
                      ? "bg-success text-white"
                      : "bg-secondary-subtle"
                  } p-1 ps-4 d-flex`}
                >
                  <span>A &nbsp;</span>
                  {item.optionFour
                    .replace(/<[^>]*>/g, "")
                    .replace(/&nbsp;/g, " ")}
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 p-2 ">
                <sapn className="">
                  {" "}
                  <FiEdit3
                    onClick={() => {
                      handleSetData(item);
                    }}
                    className="fw-bolder fs-5"
                    style={{ color: "rgb(185, 202, 249)" }}
                  />{" "}
                  <span
                    className="text-secondary-subtle"
                    style={{ color: "#e2e3e5" }}
                  >
                    {" "}
                    |{" "}
                  </span>{" "}
                </sapn>
                <sapn className="">
                  {" "}
                  <CgTrash
                    className="fw-bolder fs-5"
                    style={{ color: "rgb(247, 20, 27)" }}
                  />
                </sapn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
