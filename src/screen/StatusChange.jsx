import React from "react";
import "../assets/styles/BharatSatExam.css"; 
import axios from "axios";
import { toast } from "react-toastify";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMzMTE4Njc2LCJleHAiOjE3MzMyMDUwNzZ9.ZPtIL_8HEMdTBosltfopmYF3M5raXPWONN0BhwT7eCk";


export default function StatusChange({data,handleGetExamList}) {
    const handleStatusChange=async()=>{
        try {
            const result = await axios.put(
              "http://192.168.0.27:5003/bharatSat/change-status",{
                id:data.bharatSatExamId,
                is_active:!data.is_active
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (result.status === 200) {
              toast.success('success')
              handleGetExamList()
            }
          } catch (error) {
            toast.error(error.response.data.error);
          }
    }
  return (
    <div
      class="modal fade"
      id="confirmationModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content custom-modal">
          <div class="modal-header border-0 d-flex flex-column align-items-center">
            <div class="icon-container ">
              <span class="icon-warning">!</span>
            </div>
            <div class="icon-container-shedow ">
            </div>
            <h2 class="modal-title text-center fs-2 ">
              Are you sure want to change the status?
            </h2>
          </div>
          <div class="modal-body text-center ">
            <div class="d-flex justify-content-center pb-3">
              <button class="btn btn-secondary me-3" data-bs-dismiss="modal">
                No
              </button>
              <button class="btn btn-danger" onClick={handleStatusChange}  data-bs-dismiss="modal">Yes</button>
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
