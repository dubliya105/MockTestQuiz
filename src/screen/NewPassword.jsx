import React,{useState} from 'react'
import Layout from '../components/Layout'
import style from '../assets/styles/NewPassword.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export default function NewPassword() {
   const navigate=useNavigate();
   let location =useLocation();
    const {email} =location.state||{}
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [error, setError] = useState(false)
   const hendleOtpverification=async()=>{
    try {
      setError(!error)
        if(password!==''&& confirmPassword!==''){
          const result = await axios.patch('http://192.168.0.156:8080/api/user/newpass',{
            email,
            password,
            confirmPassword
          });
          if(result.status===200){
            toast.success('Password updated successfully')
            navigate('/')
            toast.success('Otp verified')
          }
      
  }
} catch (error) {
  toast.error(error.response.data.msg)
}
}
  return (
  
       <Layout>
       <div className="container-fluid d-flex flex-column vh-100">
        <div className="row flex-grow-1">
          <div className="col-md-6 col-12 col-md-6 d-none d-md-block"></div>
          <div className="col-md-6 col-12 col-md-6 d-flex align-items-center justify-content-center p-5">
          <div className='p-5' style={{backgroundColor:'#003366'}}>
      <div className={`${style.head}` }>
        <div className={`${style.backIcon}`} onClick={()=>navigate('/verification')}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <h5 className=" text-light mt-4">New Password</h5>
        <p className="mb-4 mt-2 text-light" id={style.contain}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </p>
        <div className="form-floating justify-content-center align-items-center login">
          <input
            onChange={(e)=>setPassword(e.target.value)}
            className="input-group w-100 mt-3"
            type="email"
            name="email"
            id="email"
            placeholder="New Password"
          />
                  {error?password===''?<p className=" text-danger">Field can't be empty!</p>:'':''}

          {}
          <input
          onChange={(e)=>setConfirmPassword(e.target.value)}
            className="input-group w-100 mt-3"
            type="email"
            name="email"
            id="email"
            placeholder="Confirm Password"
          />
                  {error?confirmPassword===''?<p className=" text-danger">Field can't be empty!</p>:'':''}

        </div>
        <div>
             <button className={`${style.otpBtn} mt-4 `} onClick={hendleOtpverification}> Set Password </button>
             <ToastContainer/>
        </div>
        </div>
        </div>
        </div>
      </div>
    </div>
    </Layout>
  
  )
}
