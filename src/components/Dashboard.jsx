import React, { useEffect, useState } from 'react'
import MainLayout from './MainLayout.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
const [data,setData]=useState([]);
const navigate = useNavigate()
const auth = JSON.parse(localStorage.getItem("token"));
  useEffect(()=>{
      hendleGetUsers()
  },[])

  const hendleGetUsers=async()=>{
    try {
    if(auth){
      const result = await axios.get('http://localhost:8080/api/user',{
        headers:{
          Authorization:`bearer ${auth}`
        }
      })
        if(result.status===200){
        setData(result.data.data);
      }
    }
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  return (
    <MainLayout>
    <div className="row d-flex justify-content-evenly">
      {
        data.map((item,index)=>{
          return(
            <div key={index} className="col-md-3 col-sm-3 col-lg-2 col- mx-2 my-2 cards p-3 border-2 border-dark" >
            <img className='rounded-4' width={100} height={100} src="https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png" alt="" />
               <div>{item.name}</div>
               <div className=' fw-bold' style={{fontSize:'7px'}}>{item.email}</div>
            </div> 
            )})
      }
      </div>
    </MainLayout>
  )
}

export default Dashboard