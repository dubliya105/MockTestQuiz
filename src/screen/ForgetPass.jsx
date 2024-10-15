import React, { useState } from "react";
import Layout from "../components/Layout";
import style from "../assets/styles/ForgetPass.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { CirclesWithBar  } from 'react-loader-spinner'

export default function ForgetPass() {
  const [loding,setLoding]=useState(false)
  const [error,setError]=useState(false)

  const [email,setEmail]=useState('');
  const navigate =useNavigate()
  const handleNavigate=()=>{
      navigate('/auth')
  }
  const handleOTP=async()=>{
    setLoding(true)

    try {
      setError(true)
        if(email!==''){

            const result = await axios.patch('http://localhost:8080/api/user/sendotp',{
                email:email
            })
            if(result.status===200){
                navigate('/verification',{
                  state:{
                    email:email}
                })
            }
       }
    } catch (error) {
      toast.error(error.response.data.msg) 
    }
    finally
    {
      setLoding(false)
    }
}

  return (
    <Layout>
   
    <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
          <div className='p-3' style={{backgroundColor:'#003366'}}>
      <div className={`${style.head}`}>
        <div className={`${style.backIcon}`} >
          <i className="fa-solid fa-chevron-left" onClick={handleNavigate}></i>
        </div>
        <h5 className=" text-light mt-4">Forget Password</h5>
        <p className="mb-4 mt-2 text-light">
          Lorem ipsum dolor sit amet, consectetor adipiscing elit, sed do
          eiusmod tempor incididunt vt labores
        </p>
        <div className="form-floating justify-content-center align-items-center login">
          <input
            className="input-group w-100 mt-3"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
           {error?email===''?<p className=" text-danger">Field can't be empty!</p>: email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) && (
                    <p className=" text-danger">Invalid email address</p>
                  ):''}
        </div>
        <div>
        {loding?
                     <CirclesWithBar 
                              className='ms-3'
                              height="20"
                              width="20"
                              color="aliceblue"
                              outerCircleColor="aliceblue"
                              innerCircleColor="aliceblue"
                              barColor="aliceblue"
                              ariaLabel="circles-with-bar-loading"
                              />:
                                <button className={`${style.otpBtn} mt-4 py-2 px-3`} onClick={handleOTP}> Send OTP </button>}
          <ToastContainer/>
          </div>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
