import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "../assets/styles/SideBar.module.css";
import { TbTilde } from "react-icons/tb";
import { useRef } from "react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const {pathname} = useLocation();
  const ref =useRef()
  useEffect(()=>{
    if(pathname === '/createExam'||pathname === '/bharatSATexam'||pathname === '/QuestionReview'||pathname === '/questionEdit'){
     ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },[])

  return (
    <>
      <div
        className={`${style.Sidebar} ${
          isOpen ? style.Open : ""
        } overflow-y-auto`}
      >
        <nav>
          <div className="text-end d-flex justify-content-end overflow-y-scroll">
            <button
              className={`${style.ToggleButton} w-100 text-end pt-2 pe-3`}
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className={`${style.Logo} p-3`}>
            <img
              src="https://blogs.purecode.ai/blogs/wp-content/uploads/2024/09/pc-new-logo.svg"
              width={100}
              alt=""
            />
          </div>
          <ul className={style.navUl}>
            <li>
              <Link to="/dashboard" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-house"></i>
                </div>

                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/showUser" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-arrow-pointer"></i>
                </div>
                <span>Agency</span>
              </Link>
            </li>
            <li>
              <Link to="/email" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <span>Email</span>
              </Link>
            </li>
            <li>
              <Link to="/coordinate" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-users"></i>
                </div>

                <span>Coordinate</span>
              </Link>
            </li>
            <li>
              <Link to="/mocktest" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <span>Mock Test</span>
              </Link>
            </li>
            <li>
              <Link to="/mockTestQuiz" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <span>Quiz</span>
              </Link>
            </li>
            <li>
              <Link to="/blog" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link to="/package" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <span>Packages</span>
              </Link>
            </li>
            <li>
              <Link to="/showblogs" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <span>Show Blogs</span>
              </Link>
            </li>
          
            <div className="accordion-item">
              <div className={`accordion-header`} >
                <Link
                  className={`${style.NavLink} collapsed`}
                  to="/createExam"
                  style={{ background: "transparent", color: "#ffff" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded='false'
                  aria-controls="collapseFour"
                >
                <div className={style.Icon} ref={ref}>
                  <i className="fa-solid fa-calendar-days"></i>
                </div>Create Exam
                </Link>
              </div>
              
              <li
                id="collapseFour"
                className={`accordion-collapse collapse ${pathname === '/createExam'||pathname === '/bharatSATexam'?'show':''} ps-4`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" >
                  <Link
                    className={`${style.SubNavLink} accordion-header` }
                    to="/createExam"
                    style={{borderLeft:'2px solid #5e5e5eba'}}
                  >
                  <div className="fs-5" style={{color:'#5e5e5eba',position:'relative',top: '-7px',paddingRight:'4px'}}>__</div>
                   <label className={(pathname === '/createExam') ? style.subLinkActive : ''}  htmlFor="">Add</label> 
                  </Link>
                </div>
                <div className="accordion-body">
                  <Link
                    className={`${style.SubNavLink} accordion-header `}
                    to="/bharatSATexam"
                    style={{borderLeft:'2px solid #5e5e5eba'}}
                  >
                  <div className="fs-5" style={{color:'#5e5e5eba', position:'relative',top: '-7px',paddingRight:'4px'}}>__</div>
                  <label className={(pathname === '/bharatSATexam') ? style.subLinkActive : ''}  htmlFor="">view</label> 
                  </Link>
                </div>
              </li>
            </div>
            <div className="accordion-item">
              <div className={`accordion-header`} >
                <Link
                  className={`${style.NavLink} collapsed`}
                  to="/QuestionReview"
                  style={{ background: "transparent", color: "#ffff" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseReview"
                  aria-expanded='false'
                  aria-controls="collapseReview"
                >
                <div className={style.Icon} ref={ref}>
                <TbTilde className="border border-1 rounded-1" />
                </div>Reviewer
                </Link>
              </div>
              
              <li
                id="collapseReview"
                className={`accordion-collapse collapse ${pathname === '/QuestionReview'||pathname ==='questionEdit'?'show':''} ps-4`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" >
                  <Link
                    className={`${style.SubNavLink} accordion-header` }
                    to="/QuestionReview"
                    style={{borderLeft:'2px solid #5e5e5eba'}}
                  >
                  <div className="fs-5" style={{color:'#5e5e5eba',position:'relative',top: '-7px',paddingRight:'4px'}}>__</div>
                   <label className={(pathname === '/QuestionReview'||pathname ==='questionEdit') ? style.subLinkActive : ''}  htmlFor="">Question List</label> 
                  </Link>
                </div>
                <div className="accordion-body" >
                  <Link
                    className={`${style.SubNavLink} accordion-header` }
                    // to="/QuestionReview"
                    style={{borderLeft:'2px solid #5e5e5eba'}}
                  >
                  <div className="fs-5" style={{color:'#5e5e5eba',position:'relative',top: '-7px',paddingRight:'4px'}}>__</div>
                   <label className={(pathname === '') ? style.subLinkActive : ''}  htmlFor="">History</label> 
                  </Link>
                </div>
              </li>
            </div>
            <li>
              <Link to="" className={style.NavLink}>
                <div className={style.Icon}>
                  <i className="fa-solid fa-gear"></i>
                </div>
                <span>Settings</span>
              </Link>
            </li>
           
          </ul>
        </nav>
      </div>
      {isOpen ? (
        ""
      ) : (
        <button
          className={`${style.ToggleButton}  `}
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      )}
    </>
  );
}

export default SideBar;
