import React, { useContext, useEffect } from 'react'
import SideBar from '../screen/SideBar'
import NavBar from '../screen/NavBar'
import { useNavigate } from 'react-router-dom';
import { usersContext } from "../components/context/UserContext";
import Cookies from 'universal-cookie';

export default function MainLayout({children}) {

  const navigate = useNavigate()
  const user= useContext(usersContext)

  const cookies=new Cookies();

let auth=cookies.get('token')
    useEffect(()=>{
      if(!auth){
        navigate('/')
      }else{
        user.setUserData(cookies.get('user'))
        user.setToken(auth)
      }
    },[])
  
  return (
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
  ) 
}
