import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react'
import { CgTrash } from 'react-icons/cg'
import { FiEdit3 } from 'react-icons/fi'
import { RiEdit2Line } from "react-icons/ri";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';
import parse from 'html-react-parser';

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MmI2MTNhYzQ2ZWEyN2EzNzBhYmVhMyIsImVtYWlsIjoiYW5raXRjaG91aGFuLmRvbGxvcEBnbWFpbC5jb20iLCJpYXQiOjE3MzY3NzM2NTIsImV4cCI6MTczNjg2MDA1Mn0.Za9KQ6ugvY3a0WMWlIVP3w0irvRqKrSDXvY6qly3af8";


export default function SubQuestionsEdit({setProgress,questionId}) {
      const [details, setDetails] = useState(null);
      const [subQuestions, setSubQuestions] = useState([]);
      const [selectSubQuestion, setSelectSubQuestion] = useState({});

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
     async function handleGetSubQuestion(){
        try {
          const result =await axios.get('http://192.168.0.21:5003/reviewer/sub-question-list',{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token,
            },
            params:{
              question_id:questionId
            }
          });
          if(result.status === 200){
            console.log(result.data);
            
            setSubQuestions(result.data);
          }
        } catch (error) {
          console.log(error);
          
        }
      }
      useEffect(() => {
        handleGetSubQuestion();
      },[])
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
              <RiEdit2Line className="text-light" onClick={()=>setProgress(25)} />
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
            data={selectSubQuestion.question}
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
            data={selectSubQuestion.optionOne}
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
            data={selectSubQuestion.optionTwo}
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
            data={selectSubQuestion.optionThree}
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
            data={selectSubQuestion.optionFour}
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
          <select value={selectSubQuestion.correctOption?selectSubQuestion.correctOption:''} className="form-select pt-2" name="" id="">
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
            data={selectSubQuestion.solution}
            onChange={handleEditorChange}
          />
        </div>
        <div className='d-flex justify-content-end'>
        <div className="btn-group mx-2" >
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
         {
          subQuestions.subQuestionList?.map((item,index)=>(
            <div className="bg-light p-1 rounded-3 mt-2">
          <h6 className="py-2 px-1 d-flex">
            <span>{index+1}.</span>{parse(item.question)}
          </h6>
          <div className="p-1 ">
            <div className={`${item.correctOption===0?'bg-success text-white':'bg-secondary-subtle'}  ps-4 d-flex align-items-center  `}><span>A &nbsp;</span>{item.optionOne.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")}</div>
          </div>
          <div className="p-1 ">
            <div className={`${item.correctOption===1?'bg-success text-white ':'bg-secondary-subtle'} p-1 ps-4 d-flex`}><span>A &nbsp;</span>{item.optionTwo.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")}</div>
          </div>
          <div className="p-1 ">
            <div className={`${item.correctOption===2?'bg-success text-white':'bg-secondary-subtle'} p-1 ps-4 d-flex`}><span>A &nbsp;</span>{item.optionThree.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")}</div>
          </div>
          <div className="p-1 ">
            <div className={`${item.correctOption===3?'bg-success text-white':'bg-secondary-subtle'} p-1 ps-4 d-flex`}><span>A &nbsp;</span>{item.optionFour.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")}</div>
          </div>
          <div className="d-flex justify-content-end gap-2 p-2 ">
          <sapn className="" > <FiEdit3 onClick={()=>{setSelectSubQuestion(item)}} className="fw-bolder fs-5" style={{color:'rgb(185, 202, 249)'}}/> <span className="text-secondary-subtle" style={{color:'#e2e3e5'}}> | </span> </sapn>
          <sapn className=""> <CgTrash className="fw-bolder fs-5" style={{color:'rgb(247, 20, 27)'}}/></sapn>
        </div>
        </div>))
         }
        
       
      </div>
    </div>
  </div>
  )
}
