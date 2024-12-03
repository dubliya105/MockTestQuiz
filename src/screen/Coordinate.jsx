/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import '../assets/styles/Coodinate.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from "react-toastify";
import { useDownloadExcel } from 'react-export-table-to-excel';
import { FaArrowRightLong } from "react-icons/fa6";
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';


const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMzMjA1MzcwLCJleHAiOjE3MzMyOTE3NzB9.GkrBr4jaYbQuzrwt8j1SfxV7CFrs6A66QWtRosy0Uw4";

function Coordinate() {
const [detail,setDetail]=useState([])
const [requestList,setRequestList]=useState([])
const [payOut,setPayOut]=useState([])
const [startDate,setStartDate]=useState(null)
const [endDate,setEndDate]=useState(null)
const [amount,setAmount]=useState(null)
const [transitionId,setTransitionId]=useState(null)
const [mode,setMode]=useState(null)
const [show, setShow] = useState(false);
const [error, setError] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

  const handleCoordinatorDetail=async()=>{
    try {
      const result = await axios.get( 
        "http://192.168.0.27:5003/coordinator/getRequestDetailApi",
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
           params: {
           coordinatorId:'66d6dd8425461a1c1a7761e2',
           },
         }
       );
      if(result.status===200){
       setDetail(result.data.data)
       handleCoordinatorWithdraw();
       handlePayOut();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  const handleCoordinatorWithdraw=async()=>{
    try {
      const result = await axios.get( 
        "http://192.168.0.22:5003/coordinator/withdraw-requests",
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
           params: {
           coordinatorId:'66d6dd8425461a1c1a7761e2',
           offset:0,
           limit:10
           },
         }
       );
      if(result.status===200){
        setRequestList(result.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  const handlePayOut=async()=>{
    try {
      
      const result = await axios.get( 
        "http://192.168.0.27:5003/coordinator/transaction-history",
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
           params: {
           coordinatorId:'66d6dd8425461a1c1a7761e2',
           offset:0,
           limit:5,
           startDate,
           endDate:endDate?endDate:new Date().toISOString().slice(0,10) 
           },
         }
       );
      if(result.status===200){
        setPayOut(result.data.data);   
      }
    
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }


  const handleSubmit=async()=>{
    try {
      setError(true)  
      if(amount!==''&&amount!==null&&transitionId!==''&&transitionId!==null&&mode!==''&&mode!==null){
      const result = await axios.post( 
        "http://192.168.0.27:5003/coordinator/approve-withdraw-request", {
          modeOfPayment:mode,
          paidAmount: amount,
          requestId: "6731958d3a90d8280836368d",
          transactionId:transitionId
         },
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
      if(result.status===201){
        handleClose();
        setError(false);
        setMode('')
        setAmount('')
        setTransitionId('')
      }
    }
    } catch (error) {
      toast.error(error.response.data.error);
      
    }
  }
  useEffect(()=>{
    handleCoordinatorDetail();
  },[])
  
useEffect(()=>{
  handlePayOut()
},[startDate,endDate])

  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(requestList.slice(itemOffset, endOffset));

  const pageCount = Math.ceil(requestList.availableDataCount / itemsPerPage)||0;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % requestList.availableDataCount;
    setItemOffset(newOffset);
  };

  return (
    <MainLayout>
      <div className="text-start d-flex justify-content-between">
        <h4>PAYOUT</h4>
        <div className="d-flex">
          <p>Dashboard</p>
          <Link to="">-Coordinater</Link>
        </div>
      </div>
      <div className=" rounded-2 bg-light text-start p-3">
        <h6>Coordinater Details</h6>
        <div className=" shadow p-2 rounded-2 ">
          <p className="p-1 m-0 fw-bold"> {detail.coordinatorName}</p>
          <div className=" row  ">
            <div className="pt-2 m-0 fw-bold col-sm-5 col-md-4 col-lg-3 email-and-mob text-truncate" style={{ fontSize: "10px" }}>
              Email:
              <Link className=" text-decoration-none "> {detail.coordinatorEmail}</Link>
            </div>
            <div className="pt-2 m-0 fw-bold col-sm-4 col-md-4 col-lg-3 email-and-mob text-truncate" style={{ fontSize: "10px" }}>
              Mobile No:
              <Link className="text-decoration-none email-and-mob"> {detail.coordinatorMobile}</Link>
            </div>
          </div>
        </div>
        <div className="row px-2 pt-4  d-flex">
          <div className=" col-md-6 col-lg-3 col-sm-6  col-12 pt-2">
            <div className=" p-2  rounded-2 bg-secondary-subtle  ">
              <p className="p-1 m-0 fw-medium text-truncate"> Total Amount Earned</p>
              <p className=" fw-medium text-primary p-0 m-0 text-truncate" style={{fontSize:'30px'}} >₹ {detail.totalAmtEarned}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3  col-sm-6 col-12 pt-2">
            <div className=" p-2 rounded-2 bg-secondary-subtle ">
              <p className="p-1 m-0 fw-medium text-truncate"> Payment Done</p>
              <p className="fw-medium text-primary p-0 m-0 text-truncate" style={{fontSize:'30px'}}>₹ {detail.paymentDone}</p>
            </div>
          </div>
          <div className=" col-md-6 col-lg-3  col-sm-6 col-12 pt-2">
            <div className="  p-2 rounded-2 bg-secondary-subtle ">
              <p className="p-1 m-0 fw-medium text-truncate">Balance</p>
              <p className="fw-medium  text-primary p-0 m-0 text-truncate" style={{fontSize:'30px'}}>₹ {detail.balanceLeft}</p>
            </div>
          </div>
        </div>
          <h6 className="pt-5">Request list</h6>
        <div className="table-scroller">
          <table className="table">
            <thead>
              <tr className=" rounded-4">
                <th scope="col">S.No.</th>
                <th scope="col">Request Date</th>
                <th scope="col">Request Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Payout</th>
              </tr>
            </thead>
            <tbody>
            {
              requestList.map((item,index)=>{
               return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.create_date}</td>
                  <td>2000</td>
                  <td className="status">{item.status}</td>
                  <td>
                    <Link variant="primary" onClick={handleShow}>Pay Now</Link>
                  </td>
                </tr>
               )
              })
            } 
             <tr >
                  <td>{1}</td>
                  <td>11/11/24</td> 
                  <td>2000</td>
                  <td className="status">panding</td>
                  <td>
                    <Link variant="primary" onClick={handleShow}>Pay Now</Link>
                  </td>
                </tr>
            </tbody>
          </table>    

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
               <div className="p-2">
                  <label htmlFor="amount">Amount</label>
                  <input type="number" name="amount" value={amount} className="form-control" onChange={(e)=>setAmount(e.target.value)} />
                  {error&&!amount&&(<div className="text-danger">Field is requried</div>)}
               </div>
               <div className="p-2">
                  <label htmlFor="amount">Transition Id</label>
                  <input type="text" name="amount" value={transitionId} className="form-control" onChange={(e)=>setTransitionId(e.target.value)}/>
                  {error&&!transitionId&&(<div className="text-danger">Field is requried</div>)}
               </div>
               <div className="p-2">
                  <label htmlFor="amount">Mode</label>
                  <select type="text" name="amount" value={mode} className="form-control" onChange={(e)=>setMode(e.target.value)}>
                    <option value="">select</option>
                    <option value="Case">Case</option>
                    <option value="Bank Transfer">Bank</option>
                  </select>
                  {error&&!mode&&(<div className="text-danger">Field is requried</div>)}
               </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
              Submit
          </Button>
        </Modal.Footer>
      </Modal>
          <nav aria-label="Page navigation ">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3} // Display 3 page numbers
              pageCount={pageCount}
              previousLabel="Previous"
              containerClassName="pagination justify-content-end"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </nav>
        </div>
        <div className="pt-5" >
            <div className="row d-flex d-flex justify-content-start pb-3">
                <h4 className="col-sm-12 col-md-2 col-lg-3 text-truncate">Payout History</h4>
                <div className="col-sm-12  col-md-9 col-lg-9">
                <div className="row d-flex">
                  <p className="p-2 ps-3 col-12 col-sm-12 col-md-1 m-0">Date</p>
                  <div className="col-6 col-sm-6 col-md-3 pb-2">
                  <DatePicker
                    className="form-control"
                    selected={startDate}  
                    dateFormat='MM/dd/yyyy'
                    onChange={(date) => {setStartDate(moment(date).format('MM-DD-YYYY'))}}
                    maxDate={new Date()}
                    placeholderText="From"
                  />
                  </div>
                  <div className="col-6 col-sm-6 col-md-3 pb-2">
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    dateFormat='dd/MM/yyyy'
                    onChange={(date) => {setEndDate(moment(date).format('MM-DD-YYYY'))}} 
                    maxDate={new Date()}
                    placeholderText="To"
                  />
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 pb-2">
                  <select className="form-select form-selectsm w-100">
                        <option value="Commision Earned">Commision Earned</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                    <div className="btn-group" onClick={onDownload}>
                      <button className="btn btn-primary px-2" style={{backgroundColor:'rgb(19, 19, 191)'}}>Export</button>
                      <button className="btn btn-primary px-2" ><FaArrowRightLong /></button>
                    </div>
                  </div>
                </div>
            </div>
            <div className="table-scroller">
          <table className="table" ref={tableRef}>
            <thead>
              <tr className=" rounded-4">
                <th scope="col">S.No.</th>
                <th scope="col">Request Date</th>
                <th scope="col">Request Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Paid Amount</th>
                <th scope="col">Paid Date</th>
                <th scope="col">Mode of Payment</th>
                <th scope="col">Transection ID</th>
              </tr>
            </thead>
            <tbody>
             {
              payOut.map((item,index)=>{
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.requestCreateDate.slice(0,10)}</td>
                    <td>{item.amountRequested}</td>
                    <td className="" style={{color:'green'}} >{item.status}</td>
                    <td>{item.amountPaid}</td>
                    <td>{item.paidDate.slice(0,10)}</td>
                    <td style={{color:'green'}}>{item.modeOfPayment}</td>
                    <td >{item.transactionId}</td>
                  </tr>
                )
              })
             }
            </tbody>
          </table>
          </div>
        </div>
        <nav className='overflow-x-auto' aria-label="Page navigation">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="Previous"
                containerClassName="pagination justify-content-end  "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </nav>
      </div>
            <ToastContainer/>
    </MainLayout>
  );
}

export default Coordinate;
