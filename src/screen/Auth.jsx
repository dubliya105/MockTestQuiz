import React, { useState } from 'react'
import style from '../assets/styles/Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import axios from 'axios'
import { CirclesWithBar  } from 'react-loader-spinner'
import { toast, ToastContainer } from 'react-toastify'
function Auth() {
  const navigate =useNavigate()
  const [loding,setLoding]=useState(false)
  const [error,setError]=useState(false)
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
const handleLogin=async()=>{
  setError(true)
  try {
    
      if(email!==''&&password!==''){
        setLoding(true)
        const result = await axios.post('http://localhost:8080/api/user/login',{
          email,
          password
        })
        if(result.status===200){
          localStorage.setItem('user',JSON.stringify(result.data.data.user))
          localStorage.setItem('token',JSON.stringify(result.data.data.token))
          navigate('/Dashboard')
      }
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg)
  }
  finally{
    setLoding(false)

  }
}
  return (
          <Layout>
          <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6" >
          <div className='p-5' style={{backgroundColor:'#003366'}}>
          <div className='text-light text-start p-5'>
                <h5 >Login to your account</h5>
                <p className='mb-4 mt-2 '>Lorem ipsum dolor sit amet, consectetor adipiscing elit, sed do eiusmod tempor incididunt vt labores</p>
                  <div className='form-floating justify-content-center align-items-center login'>
                        <input className='input-group w-100 mt-3' type="email" name='email' id="email" placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)} />
                  {error?email===''?<p className=" text-danger">Field can't be empty!</p>: email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) && (
                    <p>Invalid email address</p>
                  ):''}
                        <input className='input-group w-100 mt-3' type="password" name='password' id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                  {error?password===''?<p className=" text-danger">Field can't be empty!</p>:'':''}
                      
                      <div className='text-end'>
                          <Link to='/forget' className={`${style.link} text-decoration-none`} >forget password</Link>
                      </div>
                  </div>
                  <div>
                   {loding?
                    <div className={` mt-4 ms-5`} >
                        <CirclesWithBar
                              height="50"
                              width="50"  
                              color="white"
                              outerCircleColor="white"
                              innerCircleColor="white"
                              barColor="white"
                              ariaLabel="circles-with-bar-loading"
                              wrapperStyle={{}}
                             
                              /></div>:
                               <button className={`${style.sign} mt-4 px-3 py-2`} onClick={handleLogin}> Sign In </button>}
                  </div>
                  <ToastContainer/>
              </div>
          </div>
          </div>  
          </div>
          
          </Layout>
  )
}

export default Auth