/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "../assets/styles/Blog.css";
import { CiUser, CiCalendar } from "react-icons/ci";
import moment from "moment-timezone";
import parse from "html-react-parser";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

function ShowBlogDetail() {

  const [data, setData] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { blog_id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};
  console.log(name, "hgvhf");
  
  const scrollRef = useRef(null);

  const handleGetBlogDetail=async() =>{
    const result = await axios.get("http://192.168.0.21:5003/blog/getBlogDetailsById", {
      params: {
          blog_id: blog_id,
      },
  });

    if (result.status === 200) {
      setData(result.data.data.blogCategoryData);
      setRelatedBlogs(result.data.data.relatedBlogs);
    }
  }
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
  };


  useEffect(()=>{
    if (scrollRef.current) {
          scrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
    if(blog_id!==undefined){
      handleGetBlogDetail();
    }  
},[blog_id])

  return (
    <MainLayout>
      <div className="text-start" ref={scrollRef}>
        <div className="text-start fs-4  fw-medium blog-title">
          {data.title}
        </div>
        <div className="d-flex">
          <div className=" fw-medium category pe-2">{name}</div>
          <div className="px-2">
            <CiUser /> {data.name}
          </div>
          <div className="px-2">
            <CiCalendar />
            {moment(data.date).format("MMM DD,YYYY")}
          </div>
        </div>
        <div className="pt-3">{data.briefIntro}</div>
        <div className="pt-3">
          {data.length !== 0 && parse(data.details, options)}
        </div>
      </div>

      <div className="text-start fs-4  fw-medium blog-title">Related Blogs</div>
      <Carousel
        infinite
        showDots={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        containerclassName="carousel-container"
        responsive={responsive}
        dotListclassName="custom-dot-list-style"
      >
        {relatedBlogs.map((item, index) => (
          <div className="p-2 pb-4" key={index}>
            <div
              className=" rounded-bottom-2"
              style={{ backgroundColor: "white" }}
            >
              <img
                className="rounded-3"
                height={150}
                style={{ width: "100%" }}
                src={`http://192.168.0.21:5003/uploads/${item.mainImage}`}
                alt=""
              />
              <div className="d-flex pt-1">
                <div className="px-1 text-truncate">
                  <CiUser /> {item.name}
                </div>
                <div className="px-2 text-truncate">
                  <CiCalendar />
                  {moment(item.date).format("MMM DD,YYYY")}
                </div>
              </div>
              <div
                className="fs-5 fw-bold text-start text-truncate px-1"
                title={item.title}
              >
                {item.title}
              </div>
              <div
                className=" fw-medium text-start text-muted text-truncate px-1"
                title={item.briefIntro}
              >
                {item.briefIntro}
              </div>
              <div className="d-flex justify-content-end py-2">
                <Link
                  to={`/showBlogDetail/${item.blog_id}`}
                  className="text-decoration-none text-dark fw-medium pt-1"
                >
                  Read More {">"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </MainLayout>
  );
}

export default ShowBlogDetail;
