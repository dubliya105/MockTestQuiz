import React from "react";
import "../assets/styles/BharatSatExam.css";
import axios from "axios";
import { toast } from "react-toastify";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MmI2MTNhYzQ2ZWEyN2EzNzBhYmVhMyIsImVtYWlsIjoiYW5raXRjaG91aGFuLmRvbGxvcEBnbWFpbC5jb20iLCJpYXQiOjE3MzY3NzM2NTIsImV4cCI6MTczNjg2MDA1Mn0.Za9KQ6ugvY3a0WMWlIVP3w0irvRqKrSDXvY6qly3af8";

export default function QuestionReject({ data }) {
  const handleStatusChange = async () => {
    try {
      const result = await axios.put(
        "http://192.168.0.21:5003/reviewer/update-status", {
            question_id: data,
            status: "rejected",
          },
       {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (result.status === 200) {
        toast.success("success");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div
      className="modal fade"
      id="confirmationModal1"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal">
          <div className="modal-header border-0 d-flex flex-column align-items-center">
            <div className="icon-container ">
              <span className="icon-warning">!</span>
            </div>
            <div className="icon-container-shedow "></div>
            <h2 className="modal-title text-center fs-2 ">
              Are you sure want to change the status?
            </h2>
          </div>
          <div className="modal-body text-center ">
            <div className="d-flex justify-content-center pb-3">
              <button
                className="btn btn-secondary me-3"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleStatusChange}
              >
                Yes
              </button>
            </div>
            <div className=" d-flex justify-content-center">
              <div className=" rounded-bottom-2  contain-shedow "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}