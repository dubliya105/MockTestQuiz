import axios from 'axios';
import { FaCheck } from 'react-icons/fa6'
import { toast } from 'react-toastify';

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MmI2MTNhYzQ2ZWEyN2EzNzBhYmVhMyIsImVtYWlsIjoiYW5raXRjaG91aGFuLmRvbGxvcEBnbWFpbC5jb20iLCJpYXQiOjE3MzY1MDMwMTIsImV4cCI6MTczNjU4OTQxMn0.ha5kKD_RXXRGyDIBOc4i2vzM3MC6c4wMHNE4GBs1jwY";

export default function GenrateTicketModal({data}) {

  const handleGenrateHallTicket=async()=>{
    try {
        const result = await axios.get(
          "http://192.168.0.21:5003/bharatSat/generate-e-hall-ticket-bharatSat",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params:{
              bharatSatExamId:data.bharatSatExamId
            },
            responseType:'blob'
          }
        );
        if (result.status === 200) {
          const url = URL.createObjectURL(result.data);
          window.open(url,'_blank')
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
}

  return (
    <div
    className="modal fade"
    id="genrateTicket"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content custom-modal">
        <div className="modal-header border-0 d-flex flex-column align-items-center justify-content-center">
          <div className="icon-container-generate ">
            <span className="icon-warning-generate"><FaCheck /></span>
          </div>
          <div className="icon-container-shedow-generate "></div>
          <h2 className="modal-title text-center fs-2 ">
            Are you sure want to generate E-hall ticket?
          </h2>
        </div>
        <div className="modal-body text-center">
          <div className="d-flex justify-content-center pb-4">
            <button className="btn btn-secondary me-3" data-bs-dismiss="modal">
              No
            </button>
            <button className="btn generate-yes" data-bs-dismiss="modal" onClick={handleGenrateHallTicket}>Yes</button>
          </div>
          <div className=" d-flex justify-content-center">
            <div className=" rounded-bottom-2  contain-shedow-generate "></div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </div>

  )
}