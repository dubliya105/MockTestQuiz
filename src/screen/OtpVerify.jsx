import React, { useState } from 'react';
import Layout from '../components/Layout';
import style from '../assets/styles/Otp.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function OtpVerify() {
  const [otp, setOtp] = useState('');


  let location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const handleOtpVerification = async () => {
    if (otp === '') {
      toast.error('Please enter OTP');
      return;
    }

    try {
      const result = await axios.patch('http://192.168.0.37:8080/api/user/otpverify', { otp });
      if (result.status === 200) {
        navigate('/newpassword', { state: { email } });
        toast.success('OTP verified');
      }
    } catch (error) {
      toast.error(error.response.data.msg || 'OTP verification failed');
    }
  };

  return (
    <Layout>
  
  <div className="container-fluid d-flex flex-column vh-100">
        <div className="row flex-grow-1">
          {/* Left side (empty on small screens) */}
          <div className="col-12 col-md-6 d-none d-md-block"></div>

          {/* Right side (login form) */}
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center  ">
          <div className={`${style.log} w-70 `} >
          <div className={style.head}>
            <div className={style.backIcon} onClick={() => navigate('/forget')}>
              <i className="fa-solid fa-chevron-left"></i> {/* Back button */}
            </div>
            <h5 className="text-light mt-4">Verify OTP</h5>
            <p className="mb-4 mt-2 text-light">
              Enter the verification code sent to {email}{' '}
              <Link className="text-decoration-none" style={{ color: '#039c91' }}>
                Edit <i className="fa-solid fa-pen"></i> {/* Edit email link */}
              </Link>
            </p>

            {/* OTP Input Section */}
            <div className="fs-3 ">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span className="me-4"></span>}
                renderInput={(props) => (
                  <input {...props} className={style.otpInput} />
                )}
              />
            </div>

            <div className=" mt-4">
              <button
                className={style.otpBtn}
                onClick={handleOtpVerification}
                disabled={otp.length !== 4} // Disable button if OTP is not fully entered
              >
                Verify
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </Layout>
  );
}