import React from 'react'
import style from '../assets/styles/Layout.module.css'
export default function Layout({children}) {
  return (
    <div>
      
      <div className={`${style.image} `}>
        <div className=' d-flex justify-content-end align-items-center'>
            {/* <div className='col-md-6 '> */}
            {/* </div> */}
            {/* <div className='col-md-6 '> */}
            {/* <div> */}
              {children}
              {/* </div> */}
            {/* </div> */}
         </div> 
    </div>
     </div>
  )
}
