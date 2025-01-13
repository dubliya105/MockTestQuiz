/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import "../assets/styles/ShowUser.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import ShowUserDe from "./ShowUserDe.jsx";
import jsPDF from "jspdf";

import { Link } from "react-router-dom";
import AddUser from "./AddUser.jsx";
import UpdateUser from "./UpdateUser.jsx";
import UserView from "./UserView.jsx";
import Cookies from "universal-cookie";
function ShowUser() {
  const [data, setData] = useState([]);
  const [view, setView] = useState({});
  const [password, setPassword] = useState("");
  const [limit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const page = Array.from({ length: totalPages }, (_, index) => index + 1);
  const cookies=new Cookies()

  let auth=cookies.get('token')

  useEffect(() => {
    hendleGetUsers();
  }, [limit, offset]);

  const hendleGetUsers = async () => {
    try {
      if (auth) {
        const result = await axios.get(
          `http://192.168.0.45:8080/api/user/userList`,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
            params: {
              limit: limit,
              offset: offset,
            },
          }
        );
        if (result.status === 200) {
          setData(result.data.data);
          setTotalPages(result.data.totalPages);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchUser = async (e) => {
    try {
      const search = e.target.value.trim();
      if (search !== "") {
        const result = await axios.get(
          `http://192.168.0.45:8080/api/user/search/${search}`,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
            params: {
              limit: limit,
              offset: offset,
            },
          }
        );
        if (result.status === 200) {
          setData(result.data.data);
          setTotalPages(result.data.totalPages);
        }
      } else {
        hendleGetUsers();
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const updateUserStatus = async (id, status) => {
    try {
      console.log(id, status);

      // setStatus(!status)
      const result = await axios.patch("http://192.168.0.45:8080/api/user", {
        id,
        status: !status,
      });
      if (result.status === 200) {
        hendleGetUsers();
        toast.success("update success");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const hendleDeleteUser = async (id) => {
    try {
      if (window.confirm("Are You Sure Delete?")) {
        console.log(id);
        // setStatus(!status)
        const result = await axios.delete(
          `http://192.168.0.45:8080/api/user/${id}`
        );
        if (result.status === 200) {
          hendleGetUsers();
          toast.success("delete success");
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.text("User Data PDF", 10, 10);
    doc.text(`Name:${data.name}`, 10, 20);
    doc.text(`Email:${data.email}`, 10, 30);
    const pdfData = doc.output("blob");
    const pdfURL = URL.createObjectURL(pdfData);
    window.open(pdfURL, "_blank");
  };

  const decryptPass = async (item) => {
    setView(item);
    try {
      const result = await axios.get(
        `http://192.168.0.45:8080/api/user/pass/${item._id}`
      );
      console.log(result.data.data);

      if (result.status === 200) {
        setPassword(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="user-main bg-light">
        <div className="m-4">
          <h2 className="text-start">Agencies</h2>
          <div className="d-flex justify-content-end text-center align-items-center gap-3">
            <div>
              <input
                className="form-control w-100 "
                type="search"
                placeholder="Search "
                onChange={searchUser}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary text-truncate"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              + Add User
            </button>
            <AddUser hendleGetUsers={hendleGetUsers} />
          </div>
        </div>
        <div className=" bootstrap snippets bootdey">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-box no-header clearfix">
                <div className="main-box-body clearfix">
                  <div className="table-responsive rounded-2 bg-light">
                    <table className="table user-list">
                      <thead>
                        <tr>
                          <th>
                            <span>Logo</span>
                          </th>
                          <th>
                            <span>User</span>
                          </th>
                          <th>
                            <span>Email Address</span>
                          </th>
                          <th className="text-center">
                            <span>Status</span>
                          </th>

                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length !== 0 ? (
                          data.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="text-center py-1">
                                    <img src={item.image} width={50} alt="" />
                                  </div>
                                </td>
                                <td>
                                  <div className="text-center py-1">
                                    {item.name}
                                  </div>
                                </td>
                                <td>{item.email}</td>
                                <td className="text-center">
                                  <div className="icon">
                                    <label className="switch ">
                                      <input
                                        type="checkbox"
                                        checked={item.status}
                                        onClick={() =>
                                          updateUserStatus(
                                            item._id,
                                            item.status
                                          )
                                        }
                                      />
                                      <span
                                        className="slider rounded-3 "
                                        style={{ height: "30px", width: "96%" }}
                                      />
                                    </label>
                                  </div>
                                </td>

                                <td>
                                  <div className=" d-flex justify-content-center">
                                    <Link
                                      //  onClick={()=>generatePDF(item)}
                                      onClick={() => {
                                        decryptPass(item);
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal2"
                                      className="text-right"
                                    >
                                      <span className="fa-stack ">
                                        <i className="fa fa-square fa-stack-2x "></i>
                                        <i className="fa fa-eye fa-stack-1x fa-inverse "></i>
                                      </span>
                                    </Link>
                                    <Link
                                      onClick={() => {
                                        setView(item);
                                      }}
                                      className="table-link  text-info "
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal1"
                                    >
                                      <span className="fa-stack">
                                        <i className="fa fa-square fa-stack-2x" />
                                        <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                      </span>
                                    </Link>
                                    <Link
                                      onClick={() => {
                                        hendleDeleteUser(item._id);
                                      }}
                                      className="table-link danger"
                                    >
                                      <span className="fa-stack">
                                        <i className="fa fa-square fa-stack-2x"></i>
                                        <i className="fa fa-trash-can fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </Link>
                                  </div>
                                  <UserView
                                    data={view}
                                    hendleDeleteUser={hendleDeleteUser}
                                    password={password}
                                  />
                                  <UpdateUser
                                    hendleGetUsers={hendleGetUsers}
                                    data={view}
                                  />
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr> Not Data Found !</tr>
                        )}
                      </tbody>
                    </table>
                    <nav className="px-3" aria-label="Page navigation example">
                      <ul className="pagination justify-content-end">
                        <li className="page-item">
                          <Link
                            className={`page-link ${
                              offset === 1 ? "disabled" : ""
                            }`}
                            onClick={() =>
                              setOffset(offset !== 0 ? offset - 1 : 1)
                            }
                          >
                            &laquo;
                          </Link>
                        </li>
                        {page.map((item, index) => {
                          return (
                            <li
                              className="page-item"
                              key={index}
                              onClick={() => setOffset(item)}
                            >
                              <Link className="page-link">{item}</Link>
                            </li>
                          );
                        })}

                        <li
                          className={`page-item ${
                            offset === totalPages ? "disabled" : ""
                          }`}
                          onClick={() =>
                            setOffset(
                              offset !== totalPages ? offset + 1 : totalPages
                            )
                          }
                        >
                          <Link className="page-link">&raquo;</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </MainLayout>
  );
}

export default ShowUser;
