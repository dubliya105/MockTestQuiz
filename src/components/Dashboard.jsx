/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import MainLayout from './MainLayout.jsx'
import axios from 'axios'

import { usersContext } from "../components/context/UserContext";


function Dashboard() {
const [data,setData]=useState([]);
const auth=useContext(usersContext)

  useEffect(()=>{
      hendleGetUsers()
  },[auth])
  console.log(auth);
  const hendleGetUsers=async()=>{
    try {
    if(auth){
      const result = await axios.get('http://192.168.0.80:8080/api/user',{
        headers:{
          Authorization:`bearer ${auth.token}`
        }
      })
        if(result.status===200){
        setData(result.data.data);
      }
    }
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  return (
    <MainLayout>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner h-50">
          <div className="carousel-item active">
            <img height={400} src='https://res.cloudinary.com/dgir2f3qu/image/upload/v1724734595/samples/landscapes/nature-mountains.jpg' className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img height={400} src="https://res.cloudinary.com/dgir2f3qu/image/upload/v1724734600/samples/balloons.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item"> 
            <img height={400} src="https://res.cloudinary.com/dgir2f3qu/image/upload/v1724734591/sample.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev" 
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="row d-flex align-items-center justify-content-sm-center justify-content-md-start pt-4 ">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="col-md-3 col-sm-6 col-lg-2  mx-2 my-2 cards p-3 border-2 border-dark "
            >
              <img
                className="rounded-4"
                width={100}
                height={100}
                src="https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
                alt=""
              />
              <div>{item.name}</div>
              <div className=" text-center d-flex justify-content-center fw-bold" style={{ fontSize: "7px" }}>
                {item.email}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}

export default Dashboard