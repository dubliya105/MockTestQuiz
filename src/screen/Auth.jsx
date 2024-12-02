import React, { useState } from "react";
import style from "../assets/styles/Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setError(true);
    try {
      if (email !== "" && password !== "") {
        setLoading(true);
        const result = await axios.post("http://192.168.0.16:8080/api/user/login", {
          email,
          password,
        });
        if (result.status === 200) {
          localStorage.setItem("user", JSON.stringify(result.data.data.user));
          localStorage.setItem("token", JSON.stringify(result.data.data.token));
          navigate("/Dashboard");
        }
      }
    } catch (error) {
      console.log(error);
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
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
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

export default Auth;
