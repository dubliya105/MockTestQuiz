import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

export default function Signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const handlesignup =async(e)=>{
        try {
            e.preventDefault();
            const result =await axios.post('http://192.168.0.45:8080/api/user',{
                name:name,
                email:email,
                password:password,
                confirmPassword:confirmPassword,
                isverify:false
            })
            console.log(result.data);
            if (result.status === 201) {
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                navigate('/otpverify')
            }
        } catch (error) {
            toast.error(error.response.data.msg) 
        }
    }

  return (
    <div>
        {/* Registration 7 - Bootstrap Brain Component */}
        <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                <div className="card border border-light-subtle rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="row">
                    <div className="col-12">
                        <div className="mb-5">
                        <h2 className="h4 text-center">Registration</h2>
                        <h3 className="fs-6 fw-normal text-secondary text-center m-0">Enter your details to register</h3>
                        </div>
                    </div>
                    </div>
                    <form onSubmit={handlesignup}>
                    <div className="row gy-3 overflow-hidden">
                        <div className="col-12">
                        <div className="form-floating mb-3">
                            <input type="text" value={name} className="form-control" name="firstName" id="firstName" placeholder="First Name" onChange={(e)=>setName(e.target.value)} required />
                            <label htmlFor="firstName" className="form-label"> Name</label>
                        </div>
                        </div>
                        <div className="col-12">
                        <div className="form-floating mb-3">
                            <input type="email" value={email} className="form-control" name="email" id="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} required />
                            <label htmlFor="email" className="form-label">Email</label>
                        </div>
                        </div>
                       
                       
                        <div className="col-12">
                        <div className="form-floating mb-3">
                            <input type="password" value={password} className="form-control" name="password" id="password" defaultValue placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
                            <label htmlFor="password" className="form-label">Password</label>
                        </div>
                        </div>
                        <div className="col-12">
                        <div className="form-floating mb-3">
                            <input type="password" value={confirmPassword} className="form-control" name="confirm-password" id="confirm-password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}  required />
                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        </div>
                        </div>
                        <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue name="iAgree" id="iAgree" required />
                            <label className="form-check-label text-secondary" htmlFor="iAgree">
                            I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                            </label>
                        </div>
                        </div>
                        <div className="col-12">
                        <div className="d-grid">
                            <button className="btn bsb-btn-xl btn-primary" type="submit">Sign up</button>
                            <ToastContainer/>
                        </div>
                        </div>
                    </div>
                    </form>
                    <div className="row">
                    <div className="col-12">
                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                        <p className="m-0 text-secondary text-center">Already have an account? <Link to='/' className="link-primary text-decoration-none">Sign in</Link></p>
                    </div>
                    </div> 
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

    </div>
  )
}
