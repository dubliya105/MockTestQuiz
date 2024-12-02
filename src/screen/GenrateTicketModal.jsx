import React from 'react'
import { FaCheck } from 'react-icons/fa6'

export default function GenrateTicketModal() {
  return (
    <div
    class="modal fade"
    id="genrateTicket"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content custom-modal">
        <div class="modal-header border-0 d-flex flex-column align-items-center justify-content-center">
          <div class="icon-container-generate ">
            <span class="icon-warning-generate"><FaCheck /></span>
          </div>
          <div class="icon-container-shedow-generate "></div>
          <h2 class="modal-title text-center fs-2 ">
            Are you sure want to generate E-hall ticket?
          </h2>
        </div>
        <div class="modal-body text-center">
          <div class="d-flex justify-content-center pb-4">
            <button class="btn btn-secondary me-3" data-bs-dismiss="modal">
              No
            </button>
            <button class="btn generate-yes" data-bs-dismiss="modal">Yes</button>
          </div>
          <div className=" d-flex justify-content-center">
            <div className=" rounded-bottom-2  contain-shedow-generate "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
