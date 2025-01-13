import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import OtpEmail from "./OtpEmail";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [change,setChange]=useState(false);
  const [btn,setBtn]=useState(false);
  const handleLogin = async () => {
    try {
      setBtn(!btn)
      
      if(name!==''&&password!==''){
          const result = await axios.post("http://192.168.0.45:8080/api/user/login", {
              email:name,
              password
          });
          if (result.status === 200) {
            setName('')
              setPassword('')
              localStorage.setItem('user',JSON.stringify(result.data.data))
              toast.success("Login Successfull");
              
            }
          }
    } catch (error) {
      toast.error(error.response.data.msg)
    }
 
  };


  return (
    <div className=" justify-content-center align-items-center mt-5">
      <center>
        <div
          className="row justify-content-center align-items-center rounded-2 w-75 mb-2"
          style={{ border: "1px solid black" }}
        >
          <div className="col-md-9 col-lg-6 col-xl-6 ">
            <img
              className="img-fluid"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="loginform"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-6 border-start">
          {!change?
           <div>

              <span className="d-flex m-5 h-25 justify-content-between">
                <h4 className="p-2">Sign in with :-</h4>
                <button
                  type="button"
                  className="btn btn-outline-primary mx-1 rounded-5"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary mx-1 rounded-5"
                >
                  <i className="fab fa-twitter"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary mx-1 rounded-5"
                >
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </span>
              <hr />
              
              <div>
              <div className="p-2">
                <div className="form-outline mb-4 text-lg-start">
                  <label className="form-label " for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={name}
                    className="form-control  "
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a valid email address"
                  />
                  {btn?name===''?<p className=" text-danger">Field can't be empty!</p>: name && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(name) && (
        <p  className="text-danger">Invalid email address</p>
      ):''}
                 
                </div>

                <div className="form-outline mb-1 text-lg-start">
                  <label className="form-label " for="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  {btn?password===''?<p className=" text-danger">Field can't be empty!</p>:'':''}
                </div>
              </div>
              <span className="d-flex justify-content-between">
                <div className="d-flex ">
                  <input type="checkbox" className="mx-2" /> Remember me{" "}
                </div>
                <Link className="text-dark text-decoration-none" onClick={()=>setChange(!change)}>
                 
                  Forgot password?
                </Link>
              </span>
              <button
                type="button"
                className="btn btn-primary btn-lg m-2"
                onClick={handleLogin}
              >
                Login
              </button><br />
              <span>
               <div className="m-2">Don’t have an account? <Link to='/signup'> Register</Link></div>
              </span>
              </div>
              </div>
            :
           <OtpEmail change={change} setChange={setChange} /> }
          </div>
          
        </div>
      </center>
              <ToastContainer />
    </div>
  );
}
