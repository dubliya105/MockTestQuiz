import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { IoMdCheckmark } from "react-icons/io";
import "../assets/styles/Blog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import { ThreeDots } from "react-loader-spinner";
  
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MmI2MTNhYzQ2ZWEyN2EzNzBhYmVhMyIsImVtYWlsIjoiYW5raXRjaG91aGFuLmRvbGxvcEBnbWFpbC5jb20iLCJpYXQiOjE3MzY3NDY4ODMsImV4cCI6MTczNjgzMzI4M30.zqjzGDkwO12_LDdd4Hctne3U5Rd9aQX85UB3aKBckBo";

function Blog() {
  const [details, setDetails] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [author_id, setAuthor_id] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [briefIntro, setBriefIntro] = useState(null);
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [allAuthor, setAllAuthor] = useState([]);
  const [error, setError] = useState(false);
  const [featuredImageError, setFeaturedImageError] = useState("");
  const [mainImageError, setMainImageError] = useState("");
  const [loader, setLoader] = useState(false);

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: () => {
          return loader.file.then((file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64String = reader.result;
                const imageElement = `<img src="${base64String}" alt="Uploaded Image" />`;

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
  const inputFeaturedRef = useRef(null);
  const inputMainRef = useRef(null);
  useEffect(() => {
    handleGetCategory();
    handleGetAuthor();
  }, []);

  const handleFeatuerdImage = (e) => {
    const file = e.target.files[0];
    const extension = file.name.split(".").pop();

    if (extension === "jpg" || extension === "jpeg" || extension === "webp") {
      setFeaturedImage(file);
      setFeaturedImageError("");
    } else {
      setFeaturedImageError(
        "(Extension: jpg, jpeg, webp | Dimension: 1000x600 px)"
      );
      setFeaturedImage("");
      inputFeaturedRef.current.value = null;
    }
  };
  const handleMainImage = (e) => {
    const file = e.target.files[0];
    const extension = file.name.split(".").pop();

    if (extension === "jpg" || extension === "jpeg" || extension === "webp") {
      setMainImage(file);
      setMainImageError("");
    } else {
      setMainImageError(
        "(Extension: jpg, jpeg, webp | Dimension: 1000x600 px)"
      );
      setMainImage("");
      inputMainRef.current.value = null;
    }
  };
  async function handleSumitData() {
    setError(true);
    setLoader(true);
    try {
      if (
        details &&
        category_id &&
        author_id &&
        featuredImage &&
        mainImage &&
        briefIntro &&
        title &&
        date
      ) {
        const formData = new FormData();
        formData.append("blog_id", "");
        formData.append("category_id", category_id);
        formData.append("author_id", author_id);
        formData.append("featuredImage", featuredImage);
        formData.append("mainImage", mainImage);
        formData.append("briefIntro", briefIntro);
        formData.append("title", title);
        formData.append("date", date);
        formData.append("details", details);
        const result = await axios.post(
          `http://192.168.0.21:5003/blog/add-blog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.status === 200) {
          setError(false);
          setDetails("");
          setCategory_id("");
          setAuthor_id("");
          setFeaturedImage("");
          setMainImage("");
          setBriefIntro("");
          setTitle("");
          setDate("");
          setFeaturedImage("");
          setMainImage("");
          inputFeaturedRef.current.value = null;
          inputMainRef.current.value = null;
          toast.success("Blog Added Successfully");
        }
      }
    } catch (error) {

      toast.error(error.response.data.error);
    } finally {
      setLoader(false);
    }
  }

  const handleGetAuthor = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.21:5003/author/get-all-author",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setAllAuthor(result.data.data);
      }
      console.log(result.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleGetCategory = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.21:5003/blogCategory/get-all-blog-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setAllCategory(result.data.data);
      }
      console.log(result.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleEditorChange = (event, editor) => {
    setDetails(editor.getData());
  };

  return (
    <MainLayout>
      <div className="text-start d-flex justify-content-between">
        <h4>Blog Page</h4>
        <div className="d-flex">
          <p>Dashboard</p>
          <Link to="">-Blog Page</Link>
        </div>
      </div>
      <div
        className=" rounded-2 text-start p-3"
        style={{ backgroundColor: "white" }}
      >
        <h5>Blog</h5>
        <div className="row pt-4">
          <div className="col-sm-6">
            <label htmlFor="" className="fw-medium form-label">
              Select Category<span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={category_id}
              className="form-select"
              onChange={(e) => setCategory_id(e.target.value)}
            >
              <option value="">select</option>
              {allCategory.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
            {error ? (
              category_id === "" || category_id === null ? (
                <p className="text-danger m-0 ">Field can't be select!</p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>

          <div className="col-sm-6">
            <label htmlFor="" className="fw-medium  form-label">
              Author Name<span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={author_id}
              className=" form-select"
              onChange={(e) => setAuthor_id(e.target.value)}
            >
              <option value="">select</option>
              {allAuthor.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            {error ? (
              author_id === "" || author_id === null ? (
                <p className="text-danger m-0 ">Field can't be select!</p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row pt-2">
          <div className="col-sm-6">
            <label htmlFor="" className="fw-medium  form-label">
              Date<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <DatePicker
              wrapperClassName="w-100"
              className="form-control"
              selected={date}
              dateFormat="MM-dd-yyyy"
              onChange={(e) => {
                setDate(moment(e).format("MM-DD-YYYY"));
              }}
              maxDate={new Date()}
              placeholderText="MM/DD/YYYY"
              showMonthDropdown
              showYearDropdown
            />

            {error ? (
              date === "" || date === null ? (
                <p className="text-danger m-0 ">Field can't be empty!</p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>

          <div className="col-sm-6">
            <label htmlFor="" className="fw-medium  form-label">
              Blog Title<span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={title}
              className="form-control"
              accept="image/jpg"
              type="text"
              placeholder="Blog Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            {error ? (
              title === "" || title === null ? (
                <p className="text-danger m-0 ">Field can't be empty!</p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row pt-2">
          <div className="col-sm-6">
            <label htmlFor="" className="fw-medium form-label">
              Featured Image
              <span style={{ color: "red" }}>*{featuredImageError}</span>
            </label>
            <input
              ref={inputFeaturedRef}
              className="input-group border p-1 rounded-2"
              type="file"
              onChange={(e) => handleFeatuerdImage(e)}
            />
            {error ? (
              featuredImage === "" || featuredImage === null ? (
                <p className="text-danger m-0 ">Field can't be empty! </p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>

          <div className="col-sm-6">
            <label htmlFor="" className="fw-medium  form-label">
              main Image<span style={{ color: "red" }}>*{mainImageError}</span>
            </label>
            <input
              ref={inputMainRef}
              className="input-group border p-1 rounded-2"
              type="file"
              onChange={(e) => handleMainImage(e)}
            />
            {error ? (
              mainImage === "" || mainImage === null ? (
                <p className="text-danger m-0 ">Field can't be empty!</p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="pt-2 ">
          <label htmlFor="" className="fw-medium py-2">
            Brief Intro<span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            value={briefIntro}
            className=" form-control"
            name=""
            id=""
            placeholder="File name"
            onChange={(e) => setBriefIntro(e.target.value)}
          ></textarea>
          {error ? (
            briefIntro === "" || briefIntro === null ? (
              <p className="text-danger m-0 ">Field can't be empty!</p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="" className="fw-medium py-2">
            Details<span style={{ color: "red" }}>*</span>
          </label>
          <CKEditor
            config={{
              extraPlugins: [CustomUploadAdapterPlugin],
              language: "en",
              toolbar: [
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
               
              ],
            }}
            editor={ClassicEditor}
            data={details}
            onChange={handleEditorChange}
          />
          {error ? (
            details === "" || details === null ? (
              <p className="text-danger m-0 ">Field can't be empty!</p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        <div className="d-flex justify-content-end align-items-center pt-3">
          {loader ? (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperclassName=""
            />
          ) : (
            <div className="btn-group " onClick={handleSumitData}>
              <button
                className="btn"
                style={{ backgroundColor: "#1313bf", color: "white" }}
              >
                Submit
              </button>
              <button className="btn btn-primary">
                <IoMdCheckmark />
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}

export default Blog;
