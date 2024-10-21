import React from 'react'
import style from '../assets/styles/Layout.module.css'
export default function Layout({children}) {
  return (
    <div>
      
      <div className={`${style.image} `}>
        <div className=' d-flex justify-content-end align-items-center'>
           
              {children}
             
         </div> 
    </div>
     </div>
  )
}
