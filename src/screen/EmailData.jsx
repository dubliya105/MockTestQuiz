import React from 'react'
import MainLayout from '../components/MainLayout'
import { Link } from 'react-router-dom';

export default function EmailData() {
  return (
    <MainLayout>
      <div className="row z-1">
        <div className="col-sm-5 bg-light rounded-3">
          <div className='row p-2 d-flex justify-content-center align-items-center'>
            <div className='col-sm-4'>
              <img
              width={50}
                src="https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
                alt=""
              />
            </div>
            <div className='col-sm-4'> Indexs</div>
            <div className='col-sm-4'>
                <button className='btn btn-info'>compase</button>
            </div>
          </div>
          <hr />
          <div className="">
            <Link className="list-group-item list-group-item-action ">
              <div className="row d-flex">
                <div className="col-sm-2 px-1 text-start">
                  <img
                    className=" rounded-2"
                    width={50}
                    height={50}
                    src="https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
                    alt=""
                  />
                </div>
                <div className="col-sm-10">
                  <div className="d-flex justify-content-between w-100">
                    <h5 className=" p-1 mb-1 fs-6 fw-bold">List</h5>
                    <small className="text-end">12:29 PM</small>
                  </div>
                  <p className="p-1 mb-1 text-start">
                    Some placeholder content in a paragraph. And some small
                    print.{" "}
                  </p>
                </div>
              </div>
            </Link>
            <hr />
            <Link className="list-group-item list-group-item-action ">
              <div className="row d-flex">
                <div className="col-sm-2 px-1 text-start">
                  <img
                    className=" rounded-2"
                    width={50}
                    height={50}
                    src="https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
                    alt=""
                  />
                </div>
                <div className="col-sm-10">
                  <div className="d-flex justify-content-between w-100">
                    <h5 className=" p-1 mb-1 fs-6 fw-bold">List</h5>
                    <small className="text-end">12:29 PM</small>
                  </div>
                  <p className="p-1 mb-1 text-start">
                    Some placeholder content in a paragraph. And some small
                    print.{" "}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-sm-6"></div>
      </div>
    </MainLayout>
  );
}
