import React, { useEffect } from 'react'
import SideBar from '../screen/SideBar'
import NavBar from '../screen/NavBar'
import { useNavigate,useLocation } from 'react-router-dom';

export default function MainLayout({children}) {
  const navigate = useNavigate()
  const auth = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();

    useEffect(()=>{
      if(!auth){
        navigate('/') 
      }else{
        navigate(location.pathname)
      }
    },[])
  
  return (
    <>
    <div className='d-flex'>
       <div className='sidebar'  style={{width: 'calc(100% - 80%)'}}>
          <SideBar/>    
        </div>
        <div className='contain overflow-y-scroll' style={{width: 'calc(100% - 20%)',height:'100vh'}}>
            <NavBar/>  
            <div className='p-3' >  
              {children}
            </div>
        </div>
    </div>
    </>
  ) 
}
