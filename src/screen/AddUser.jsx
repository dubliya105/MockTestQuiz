/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, {useState } from "react";
import { toast } from "react-toastify";

export default function AddUser({hendleGetUsers}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [choose,setChoose]=useState(false);
  const [image, setImage] = useState("");


  const handlesignup = async () => {
    try {
      setBtn(true);
      if(name!==''&&email!==''&&password!==''&&confirmPassword!==''){
      const result = await axios.post("http://192.168.0.45:8080/api/user", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        image:image,
        isverify:true
      });
      console.log(result.data);
      if (result.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setImage('')
        // navigate('/otpverify')
        setBtn(false);
        hendleGetUsers()
      }
    }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
// image upload 
  async function imageUpload(e) {
    try {
      const formData = new FormData();
      formData.append("image",e.target.files[0]);
      let result = await fetch("http://192.168.0.45:8080/api/user/upload", {
        method:'post',
        body:formData,
        dataType:"jsonp"
      });
      setChoose(true)  
      result=await result.json();
      setImage(result.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <u>
                <h5 className="modal-title" id="exampleModalLabel">
                  Add User
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
              </div>
                 {btn?name===''?<p className="text-danger m-0 " style={{textAlign:'start',paddingLeft:'27%'}}>Field can't be empty!</p>:'':''}
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
              </div>
                {btn ? (
                email === "" ? (
                  <p className="text-danger" style={{textAlign:'start',paddingLeft:'27%'}}>Field can't be empty!</p>
                ) : (
                  email &&
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) && (
                    <p className="  text-danger" style={{textAlign:'start',paddingLeft:'27%'}}>Invalid email address</p>
                  )
                )
              ) : (
                ""
              )}

              <div
                className="d-flex justify-content-between p-3 fw-bold"
                style={{ fontSize: "14px" }}
              >
                
                <label htmlFor="Password">Password</label>
                <input
                  name="Password"
                  value={password}
                  placeholder="Enter User Password"
                  className="form-control ms-5 w-75"
                  type="text"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
                 {btn?password===''?<p className=" text-danger" style={{textAlign:'start',paddingLeft:'27%'}}>Field can't be empty!</p>:'':''}
              <div
                className="d-flex justify-content-between p-3 fw-bold"
                style={{ fontSize: "14px" }}
              >
                
                <label htmlFor="Password">Confirm Password</label>
                <input
                  name="Password"
                  value={confirmPassword}
                  placeholder="Enter User Confirm Password"
                  className="form-control ms-5 w-75"
                  type="text"
                  onChange={(e)=>setConfirmPassword(e.target.value)}

                />
              </div>
                 {btn?confirmPassword===''?<p className=" text-danger" style={{textAlign:'start',paddingLeft:'27%'}}>Field can't be empty!</p>:'':''}
            </div>
            <div
                className="d-flex justify-content-between p-3 fw-bold"
                style={{ fontSize: "14px" }}
              >
              <label htmlFor="Password">image</label>
            <input onChange={imageUpload} className="form-control ms-5 w-75" type="file" name="image" required/> 
                </div>
                <div className="text-start" style={{paddingLeft:'27%'}}> 
                {
                    choose?<img  width={100} height={100}  src={image} alt="image not found" className="w-25 h-25"  />:
                    <img width={100} height={100} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHh3xq0QcYk0CxXUpm2cjhPGVF_9DYPGDcy4M1yXAi2FKyuxu2FHcgEHr_Og&s' alt="image not found"  />
                } 
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
                type="submit"
                className="btn btn-primary px-5"
                onClick={handlesignup}
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
