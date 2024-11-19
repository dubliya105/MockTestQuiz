import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/styles/Blog.css";
import { CiCalendar, CiUser } from "react-icons/ci";
import moment from "moment-timezone";

export default function ShowBlog() {
  const [data, setData] = useState([]);
  const [dataBlogs, setDataBlogs] = useState([]);
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [blogCategoryId,setBlogCategoryId]=useState(null);

  async function handleGetPackages() {
    const result = await axios.get("http://192.168.0.27:5003/blog/getAll", {
      params: {
        blog_Category_id: blogCategoryId,
        limit: undefined,
        offset: undefined,
      }, 
    });
    if (result.status === 200) {
      setDataBlogs(result.data.data.BlogData);
      setBlogCategoryData(result.data.data.blogCategoryData);
      setBlogCategoryId(blogCategoryId?blogCategoryId:result.data.data.blogCategoryData[0].blog_Category_id);
      setData(result.data.data);
    }
  }
const handleBlogsCategory=(item)=>{
    setBlogCategoryId(item.blog_Category_id)
}

  useEffect(() => {
    handleGetPackages();
  }, [blogCategoryId]);

  return (
    <MainLayout>
    <div className="d-flex justify-content-center">
      <nav className="navbar navbar-expand navbar-light py-3 overflow-x-auto">
          <ul className="navbar-nav fw-medium">
            {blogCategoryData?.map((item, index) => {
              return (
                <li className="nav-item p-2" key={index}>
                  <Link
                    className={`nav-link text-truncate p-2 ${
                    blogCategoryId===item.blog_Category_id ? "blog-category" : ""}`}
                    aria-current="page"
                    to=""
                    onClick={() => handleBlogsCategory(item)}
                  >
                    {item.categoryName}
                  </Link>
                </li>
              );
            })}
          </ul>
      </nav>
      </div>
      <div className="row d-flex justify-content-start">
        {dataBlogs.map((item, index) => (
          <div className="col-6 col-sm-6 col-md-4 col-lg-3 pt-3">
            <img
              className="rounded-3"
              height={150}
              style={{ width: "100%" }}
              src={`http://192.168.0.27:5003/uploads/${item.mainImage}`}
              alt=""
            />
            <div className="d-flex pt-1">
            <div className='px-1'>
              <CiUser /> {item.name}
            </div>
            <div className='px-2'><CiCalendar/>{moment(item.date).format('MMM DD,YYYY') }</div>
            </div>
            <div
              className="fs-5 fw-bold text-start text-truncate"
              title={item.title}
            >
              {item.title}
            </div>
            <div
              className=" fw-medium text-start text-muted text-truncate"
              title={item.briefIntro}
            >
              {item.briefIntro}
            </div>
            <div className="d-flex justify-content-end py-2">
                <Link to={`/showBlogDetail/${item.blog_id}`} className=" text-decoration-none text-dark fw-medium pt-1"> Read More {">"} </Link>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
