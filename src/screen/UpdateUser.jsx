import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function UpdateUser({data,hendleGetUsers}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [btn, setBtn] = useState(false);

    useEffect(()=>{        
        setName(data.name);
        setEmail(data.email);
    },[data])

    const handleUpdateUser = async () => {
      try {
        setBtn(true);   
        if(name!==''&&email!==''){
        const result = await axios.patch(`http://192.168.0.82:8080/api/user/${data._id}`, { 
          name: name,
          email: email,
        });
        console.log(result.data);
        if (result.status === 200) {
          setName("");
          setEmail("");
          // navigate('/otpverify')
          setBtn(false);
          hendleGetUsers()

        }
      }
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    };
    return (
      <div>
        <div
          className="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content text-dark">
              <div className="modal-header">
                <u>
                  
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update User
                  </h5>
                </u>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close" 
                  onClick={()=>setBtn(false)}
  
                ></button>
              </div>
              <div className="modal-body ">
                <div
                  className="d-flex justify-content-between p-3 fw-bold"
                  style={{ fontSize: "14px" }}
                >
                  
                  <label htmlFor="Name">Name </label>
                  <input
                    name="Name"
                    value={name}
                    placeholder="Enter User Name"
                    className="form-control ms-5 w-75"
                    type="text"
                    onChange={(e)=>setName(e.target.value)}
  
                  />
                   {btn?name===''?<p className=" position-absolute p-5  text-danger">Field can't be empty!</p>:'':''}
                </div>
                <div
                  className="d-flex justify-content-between p-3 fw-bold"
                  style={{ fontSize: "14px" }}
                >
                  <label htmlFor="Email">Email</label>
                  <input
                    name="Email"    
                    value={email}
                    placeholder="Enter User Email"
                    className="form-control ms-5 w-75"
                    type="text"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                                {btn ? (
                  email === "" ? (
                    <p className=" position-absolute p-5  text-danger">Field can't be empty!</p>
                  ) : (
                    email &&
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) && (
                      <p className=" position-absolute p-5  text-danger">Invalid email address</p>
                    )
                  )
                ) : (
                  ""
                )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-5 "
                  data-bs-dismiss="modal"
                  onClick={()=>setBtn(false)}
                >
                  Cancel
                </button>
                <button
                  type="button" 
                  className="btn btn-primary px-5"
                  onClick={handleUpdateUser}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

