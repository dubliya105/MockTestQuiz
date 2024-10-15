import React from 'react'
import style from '../assets/styles/Layout.module.css'
export default function Layout({children}) {
  return (
    <div>
      
      <div className={`${style.image} p-5`}>
        {/* <div className='row  '> */}
            {/* <div className='col-md-6 '> */}
            {/* </div> */}
            {/* <div className='col-md-6 '> */}
            <div className=' '>
              {children}
              </div>
            </div>
        {/* </div> */}
    {/* </div> */}
    </div>
  )
}
