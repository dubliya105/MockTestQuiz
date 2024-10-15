import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

export default function OtpEmail({change,setChange}) {
    const [email,setEmail]=useState(''); 
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [btn,setBtn]=useState(false);
    const handleOTP=async()=>{
        try {
            if(email!==''){
                const result = await axios.patch('http://localhost:8080/api/user/sendotp',{
                    email:email
                })
                if(result.status===200){
                    setBtn(!btn)
                }
              
           }else{
            toast.error('Please enter your email')
           }
        } catch (error) {
            toast.error(error.response.data.msg) 
        }
    }

    const handleNewPassword=async()=>{
        try {
            const result =await axios.patch('http://localhost:8080/api/user/forget',{
                    otp,
                    password
                }
            );
            if(result.status===200){
                toast.success(result.data.msg)
                // setChange(!change)
            }

        } catch (error) {
            toast.error(error.response.data.msg) 
        }
    } 
  return (
    <div>
    {!btn?
        <div>
            
        <h3 className="my-2">Forgot your password?</h3>
                   <p className="w-75">Enter your email and we'll send you a link to reset your password.</p>
                    <div className="form-outline mb-4 m s-2   text-lg-start ">
                        <label className="form-label " for="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                      
                    </div>
                    <button className="btn btn-primary  w-50 mt-2   " onClick={handleOTP}>send OTP</button>
                    <ToastContainer/>
                   <p className="mt-2"> <Link className=" text-dark text-decoration-none" onClick={()=>setChange(!change)}>{'<'} Back To Login</Link></p>      
        </div>: 
        <div>
        <h3>Change Your Password</h3>
        <p className="w-75">Enter Your OTP And Enter Your New Password.</p>

            <div className="form-outline mb-4 ms-2   text-lg-start ">
                <label className="form-label " for="otp">
                    OTP
                </label>
                <input
                    type="otp"
                    id="otp"
                    value={otp}
                    className="form-control"
                    onChange={(e)=>setOtp(e.target.value)}
                    placeholder="Enter OTP 6-digit"
                />
            
            </div>
            <div className="form-outline mb-4 ms-2   text-lg-start ">
                <label className="form-label " for="email">
                    New Password
                </label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter New Password"
                />
            
            </div>  
             <button className="btn btn-primary  w-50 mt-2" onClick={handleNewPassword} >submit</button>
            <p className="mt-2"> <Link className=" text-dark text-decoration-none" onClick={()=>setBtn(!btn)}>{'<'} Back </Link></p>
        </div>
    }
    </div>
  )
}
