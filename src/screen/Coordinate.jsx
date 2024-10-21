import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import '../assets/styles/Coodinate.css'

const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
];
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => <div>{/* <h3>Item #{item}</h3> */}</div>)}
    </>
  );
}

function Coordinate() {
  const itemsPerPage = 3;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
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
        <div className=" shadow p-2 rounded-2">
          <p className="p-1 m-0 fw-bold">Suman Vyas</p>
          <div className="d-flex gap-5">
            <p className="p-1 m-0 fw-bold" style={{ fontSize: "10px" }}>
              Email:
              <Link className=" text-decoration-none">abc@gamil.com</Link>
            </p>
            <p className="p-1 m-0 fw-bold" style={{ fontSize: "10px" }}>
              Mobile No:
              <Link className="text-decoration-none">5463754735</Link>
            </p>
          </div>
        </div>
        <div className="row px-2 pt-4 ">
          <div className=" col-md-3 pt-2">
            <div className=" p-2  rounded-2 bg-secondary-subtle ">
              <p className="p-1 m-0 fw-medium "> Total Amount Earned</p>
              <p className=" fw-medium text-primary p-0 m-0" style={{fontSize:'30px'}} >₹ 1000</p>
            </div>
          </div>
          <div className="col-md-3 pt-2">
            <div className=" p-2 rounded-2 bg-secondary-subtle ">
              <p className="p-1 m-0 fw-medium"> Payment Done</p>
              <p className="fw-medium text-primary p-0 m-0" style={{fontSize:'30px'}}>₹ 1000</p>
            </div>
          </div>
          <div className=" col-md-3 pt-2">
            <div className="  p-2 rounded-2 bg-secondary-subtle ">
              <p className="p-1 m-0 fw-medium">Balance</p>
              <p className="fw-medium  text-primary p-0 m-0" style={{fontSize:'30px'}}>₹ 1000</p>
            </div>
          </div>
        </div>
          <h6 className="pt-5">Request list</h6>
        <div className="table-scroller">
          <table className="table ">
            <thead>
              <tr className=" rounded-4">
                <th scope="col">S.No.</th>
                <th scope="col">Request Date</th>
                <th scope="col">Request Amount</th>
                <th scope="col">Status.</th>
                <th scope="col">Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>05 July 2024</td>
                <td>2000</td>
                <td className=" text-danger-emphasis">In Proccess</td>
                <td>
                  <Link  data-bs-toggle="modal" data-bs-target="#exampleModal">Pay Now</Link>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>05 July 2024</td>
                <td>2000</td>
                <td className=" text-danger-emphasis">In Proccess</td>
                <td>
                  <Link data-bs-toggle="modal" data-bs-target="#exampleModal">Pay Now</Link>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>05 July 2024</td>
                <td>2000</td>
                <td className=" text-danger-emphasis">In Proccess</td>
                <td>
                  <Link data-bs-toggle="modal" data-bs-target="#exampleModal">Pay Now</Link>
                </td>
              </tr>
            </tbody>
          </table>    
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                <div className="modal-body">
                 <div className="p-2">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" className="form-control" />
                 </div>
                 <div className="p-2">
                    <label htmlFor="amount">Transision Id</label>
                    <input type="text" name="amount" className="form-control" />
                 </div>
                 <div className="p-2">
                    <label htmlFor="amount">Mode</label>
                    <input type="text" name="amount" className="form-control" />
                 </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                </div>
                </div>
            </div>
        </div>

          <Items currentItems={currentItems} />

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
              // Handle the page rendering to show the ellipsis correctly
              renderOnZeroPageCount={null}
            />
          </nav>
        </div>

        <div className="table-scroller pt-5" >
            <div className=" d-flex justify-content-between pb-3">
                <h4>Payout History</h4>
                <div className="d-flex gap-3">
                    <p className="p-2 m-0">Date</p>
                   
                    <input
                        type='date'
                        className="form-control w-100"
                        placeholder="form"
                    />
                <input
                    type="date" 
                    className="form-control"
                    id="dateInput"
                    placeholder="from"
                />
                    <select className="form-select form-selectsm w-100">
                        <option value="Commision Earned">Commision Earned</option>
                    </select>
                    <button className="btn btn-primary rounded-0 px-2">Export</button>
                </div>
            </div>
          <table className="table">
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
              <tr>
                <td>1</td>
                <td>05 July 2024</td>
                <td>2000</td>
                <td className="" style={{color:'green'}} >Paid</td>
                <td>1000</td>
                <td>07 July 2024</td>
                <td style={{color:'green'}}>Bank Transfers</td>
                <td >GDUSHJDHGJHBHJ   </td>
              </tr>
              <tr>
                <td>2</td>
                <td>05 July 2024</td>
                <td>2000</td>
                <td className="" style={{color:'green'}} >Paid</td>
                <td>1000</td>
                <td>07 July 2024</td>
                <td style={{color:'green'}}>Bank Transfers</td>
                <td >GDUSHJDHGJHBHJ   </td>
              </tr>
              <tr>
                <td>3</td>
                <td>05 July 2024</td>
                <td>2000</td>
                <td className="" style={{color:'green'}} >Paid</td>
                <td>1000</td>
                <td>07 July 2024</td>
                <td style={{color:'green'}}>Bank Transfers</td>
                <td >GDUSHJDHGJHBHJ   </td>
              </tr>
              <tr>
                <td>4</td>
                <td>05 July 2024</td>
                <td>2000</td>
                <td className="" style={{color:'green'}} >Paid</td>
                <td>1000</td>
                <td>07 July 2024</td>
                <td style={{color:'green'}}>Bank Transfers</td>
                <td >GDUSHJDHGJHBHJ   </td>
              </tr>
              <tr>
                <td>5</td>
                <td>05 July 2024</td>
                <td>2000</td>
                <td className="" style={{color:'green'}} >Paid</td>
                <td>1000</td>
                <td>07 July 2024</td>
                <td style={{color:'green'}}>Bank Transfers</td>
                <td >GDUSHJDHGJHBHJ   </td>
              </tr>
            </tbody>
            
          </table>
          <nav aria-label="Page navigation ">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2} // Display 3 page numbers
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
              // Handle the page rendering to show the ellipsis correctly
              renderOnZeroPageCount={null}
            />
          </nav>    
        </div>
      </div>
    </MainLayout>
  );
}

export default Coordinate;
