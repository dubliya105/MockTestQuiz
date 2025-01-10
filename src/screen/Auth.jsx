import React, { useState } from "react";
import style from "../assets/styles/Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import Cookies from 'universal-cookie';
import { IoMdEye,IoMdEyeOff } from "react-icons/io"; 
function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const cookies = new Cookies();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const handleLogin = async () => {
    setError(true);
    try {
      if (email !== "" && password !== "") {
        setLoading(true);
        const result = await axios.post("http://192.168.0.80:8080/api/user/login", {
          email,
          password,
        });
        if (result.status === 200) {
          cookies.set('user',result.data.data.user,{ path: "/",  expires: expirationDate});
          cookies.set('token',result.data.data.token,{ path: "/",expires: expirationDate});
          navigate("/Dashboard");
        }
      }
    } catch (error) {

      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid d-flex flex-column vh-100">
        <div className="row flex-grow-1">
          {/* Left side (empty on small screens) */}
          <div className="col-12 col-md-6 d-none d-md-block"></div>

          {/* Right side (login form) */}
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-5">
            <div className={`${style.log} w-70`}>
              <div className="text-light text-start log">
                <p className="text-white fw-bold" style={{ fontSize: "4vh" }}>
                  Login to your account
                </p>
                <p className="text-white" style={{ fontSize: "1.0rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Illum dolores voluptatibus culpa laborum officia velit.
                </p>
                <div className="form-floating login">
                  <input
                    className="input-group w-100 mt-3"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* Email validation */}
                  {error ? (
                    email === "" ? (
                      <p className="text-danger">Field can't be empty!</p>
                    ) : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        email
                      ) ? (
                      <p className="text-danger">Invalid email address</p>
                    ) : null
                  ) : null}

                  <input
                    className="input-group w-100 mt-3"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"  
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {
                    showPassword ? (
                    <IoMdEye className={`${style.passwordToggle}`} onClick={()=>setShowPassword(false)}/>
                    ) : (
                    <IoMdEyeOff className={`${style.passwordToggle}`} onClick={()=>setShowPassword(true)} />
                    )
                    }
                  {/* Password validation */}
                  {error ? (
                    password === "" ? (
                      <p className="text-danger">Field can't be empty!</p>
                    ) : null
                  ) : null}

                  <div className="text-end">
                    <Link
                      to="/forget"
                      className={`${style.link} text-decoration-none`}
                    >
                      Forget password
                    </Link>
                  </div>
                </div>
                <div>
                  {loading ? (
                    <div className="mt-4 ms-5">
                      <CirclesWithBar
                        height="50"
                        width="50"
                        color="white"
                        outerCircleColor="white"
                        innerCircleColor="white"
                        barColor="white"
                        ariaLabel="circles-with-bar-loading"
                        wrapperStyle={{}}
                      />
                    </div>
                  ) : (
                    <button
                      className={`${style.sign} mt-4 px-3 py-2`}
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  )}
                </div>

                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default React.memo(Auth); 
