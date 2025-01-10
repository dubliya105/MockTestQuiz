import React, { useState } from 'react'
import otpVerify from '../assets/styles/OtpVerify.module.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function OtpVerification() {
    const [otp,setOtp]=useState('');
    const navigate =useNavigate();
    const hendleOtpverification=async()=>{
        try {
            const result = await axios.patch('http://192.168.0.80:8080/api/user/otpverify',{
                otp
               });
               if(result.status===200){
                navigate('/')
                }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
      
    }
  return (
   <div>
  <div className="d-flex justify-content-center align-items-center continer " >
    <div className={`${otpVerify.card} py-5 px-3`}>
      <h5 className="m-0">email verification</h5>
      <span className={otpVerify.mobileText}><b>Enter the code we just sent on your email</b>
        <b className="text-color">email</b>
      </span>
      <div className="d-flex flex-row mt-5">
        <input type="text" placeholder='Enter OTP 6-Digit' className={`${otpVerify.formControl} form-control`} onChange={(e)=>{setOtp(e.target.value)}} autofocus />
      </div>
      <div className="text-center mt-5">
       <button className='btn btn-primary' onClick={hendleOtpverification} >submit</button>
      </div>
       <ToastContainer/>
    </div>
  </div>
</div>

  )
}
