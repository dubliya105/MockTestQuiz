/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import MainLayout from "../components/MainLayout";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoMdAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiEdit2Line } from "react-icons/ri";
function QusetionEdit() {
  const [details, setDetails] = useState(null);
  const location = useLocation();
  console.log(location.state);
  useEffect(() => {
    console.log(location.state);
  }, []);
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
    setDetails(editor.getData());
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
        <div className="p-3 pt-5">
          <ProgressBar percent={50} filledBackground="rgb(10, 10, 163)">
            <Step transition="scale">
              {({ accomplished }) => (
                <div
                  className={`rounded-circle ${
                    accomplished ? "active-page" : "de-active"
                  } p-3`}
                  // onClick={() => handleBack()}
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
        {/* // Type of Question : Ganral */}
        {/* <div >
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
            data={details}
            onChange={handleEditorChange}
          />
          <div>Option A <span style={{color:'red'}}>*</span></div>

                   <CKEditor
            config={{
              extraPlugins: [CustomUploadAdapterPlugin],
              language: "en",
              toolbar:toolbar,
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
            data={details}
            onChange={handleEditorChange}
          />
          <div>Option B <span style={{color:'red'}}>*</span></div>
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
            data={details}
            onChange={handleEditorChange}
          />
          <div>Option C <span style={{color:'red'}}>*</span></div>

                   <CKEditor
            config={{
              extraPlugins: [CustomUploadAdapterPlugin],
              language: "en",
              toolbar:toolbar,
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
            data={details}
            onChange={handleEditorChange}
          />
          <div>Option D <span style={{color:'red'}}>*</span></div>
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
            data={details}
            onChange={handleEditorChange}
          />
        </div>
        <div className="text-start p-3 rounded-3" style={{    backgroundColor: 'rgb(185, 202, 249)' ,borderLeft : '3px solid rgb(10, 10, 163)'}}>
          Correct Option <span style={{ color: "red" }}>*</span>
          <select value={''} className="form-select pt-2" name="" id="">
            <option value='' disabled >select correct option</option>
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
              toolbar:toolbar,
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
            data={details}
            onChange={handleEditorChange}
          />
        </div>
        </div> */}
        {/* // Type of Question : Conprensive && Poem */}
        <div>
          <div>
            <div className="text-start pt-4 ">
              <span>Parent Question</span>
              <div
                className="d-flex justify-content-between align-items-center rounded-2"
                style={{ backgroundColor: "rgb(185, 202, 249)" }}
              >
                <div
                  className="px-2  text-truncate"
                  style={{ color: "rgb(10, 10, 163)" }}
                >
                  sadsadsada ftdsuyf weur yu wer h tyfef uer wegsdjh
                </div>
                <div className="p-1">
                  <div
                    className=" rounded-3 "
                    style={{
                      backgroundColor: "rgb(10, 10, 163)",
                      padding: "8px 12px",
                    }}
                  >
                    <RiEdit2Line className="text-light" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-3 ">
            <div className="col-7">
              <div className="text-start py-2">
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
                  data={details}
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
                  data={details}
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
                  data={details}
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
                  data={details}
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
                  data={details}
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
                <select value={""} className="form-select pt-2" name="" id="">
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
                  data={details}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
            <div className="col-5 bg-secondary-subtle rounded-4" >
          </div>
          </div>
          
        </div>

        <div className=" d-flex justify-content-between py-3">
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
      </div>
    </MainLayout>
  );
}

export default QusetionEdit;
