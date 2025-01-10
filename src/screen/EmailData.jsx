/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import '../assets/styles/EmailData.css'
import { usersContext } from "../components/context/UserContext";

export default function EmailData() {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const user= useContext(usersContext)

  useEffect(() => {
    hendleGetUsers();
  }, [user]);

  const hendleGetUsers = async () => {
    try {
      if (user.token) {
        const result = await axios.get("http://192.168.0.80:8080/api/user", {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        });
        if (result.status === 200) {
          setData(result.data.data);
          setUserInfo(result.data.data[0]);
        }
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <MainLayout>
      <div className="row z-1 d-flex  ">
        <div className="col-sm-5 pt-2 ">
          <div className=" bg-light p-2 w-100 rounded-3 ">
            <div className="row  d-flex justify-content-center align-items-center p-2 ">
              <div className="col-sm-4 text-start">
                <img
                  className=" rounded-5"
                  width={50}
                  height= {50}
                  src={user.userData.image}
                  alt=""
                />
              </div>
              <div className="col-sm-8 text-end">
                <div
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Inbox
                </div>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-info text-text-truncate"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  compase
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog  position-absolute bottom-0 end-0 pe-4 w-75 ">
                    <div className="modal-content">
                      <div className="modal-header  p-2">
                        <h5 className="modal-title" id="exampleModalLabel">
                         New Message
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                      <div className=" d-flex  ">
                           <label htmlFor="">To : </label> <input type="text" className="  form-control w-75 border-0" />
                      </div><hr className="m-0" />
                      <div className=" d-flex  ">
                           <label htmlFor="">Cc : </label> <input type="text" className=" form-control w-75 border-0" />
                      </div><hr className="m-0" />
                      <div className=" d-flex  ">
                           <label htmlFor="">Bcc : </label> <input type="text" className=" form-control w-75 border-0" />
                      </div><hr className="m-0" />
                      <div className=" d-flex  ">
                           <label htmlFor="">Subject : </label> <input type="text" className=" form-control w-75  border-0" />
                      </div><hr className="m-0" />
                      <textarea name="" id="" className="input-group mt-1"></textarea>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-2">
              <input
                type="search"
                placeholder="&#128269; Search"
                className=" form-control "
              />
            </div>
            <hr />
            <div className="overflow-y-scroll" style={{height:'60vh'}}>
              {data.map((val, index) => {
                return (
                  <div key={index}  >
                    <Link className="list-group-item list-group-item-action " onClick={()=>setUserInfo(val)}>
                      <div className="d-flex justify-content-between">
                        <img
                          className="rounded-2 "
                          style={{ width: "50pxs", height: "50px" }}
                          src={val.image}
                          alt="user"
                        />
                        <div className="text-start px-2  ">
                          <p
                            className="fw-bold pb-2 m-0"
                            style={{ fontSize: "13px" }}
                          >
                            {val.name}
                          </p>
                          <h6 className="text-start">Its here! figma</h6>
                          <p
                            className="p-1 mb-1 text-start text-muted fw-bold"
                            style={{ fontSize: "12px" }}
                          >
                            Some placeholder content in a paragraph. And some
                            small print.
                          </p>
                        </div>

                        <small className="text-end   ">
                          {new Date().toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className=" position-absolute end-0 bottom-0">
                          <i className="fa-regular fa-star"></i>
                        </div>
                      </div>
                    </Link>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-sm-7 pt-2 position-sticky top-0">
          <div className="rounded-3 bg-light h-100 px-2 pt-3 ">
            <Link className="list-group-item list-group-item-action ">
              <div className="row d-flex px-2">
                <div className="col-sm-12">
                  <div className="d-flex">
                    <img
                      className="rounded-2"
                      width={50}
                      height={50}
                      src={userInfo.image}
                      alt="user"
                    />
                    <div className="text-start px-1 w-100 ">
                      <h6 className=" mb-1 fs-6 fw-bold">{userInfo.name}</h6>
                      <p
                        className="text-text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {userInfo.email}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end w-100 ">
                      <small className="text-end pe-1">{userInfo.createdAt?userInfo.createdAt.toString().slice(11,19):''}</small>
                    </div>
                  </div>

                  <h6 className="text-start">Its here! figma</h6>
                  <p
                    className="p-1 mb-1 text-start text-muted fw-bold"
                    style={{ fontSize: "12px" }}
                  >
                    Dear,
                    <br />
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.{" "}
                    <br />
                    <br />
                    Beatae tenetur error cupiditate eaque eligendi ullam alias
                    iste facilis ex. Mollitia similique ut sapiente explicabo
                    beatae eius repellendus deleniti consectetur unde Lorem
                    ipsum dolor sit amet consectetur, adipisicing elit. Numquam
                    est consectetur tempore facilis animi repellat reiciendis
                    facere natus, nam unde earum incidunt quod iure quos soluta
                    itaque voluptates dolore perspiciatis?
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
