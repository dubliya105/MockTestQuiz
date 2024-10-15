import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../assets/styles/SideBar.module.css';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    
    <> 
        <div className={`${style.Sidebar} ${isOpen?style.Open:''}` } >
        
        <nav>
        <div className='text-end d-flex justify-content-end'>
          <button className={`${style.ToggleButton} w-100 text-end pt-2 pe-3`} onClick={()=> setIsOpen(false)}>
             <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
          <div className={`${style.Logo} p-3`}>
         <img src="https://blogs.purecode.ai/blogs/wp-content/uploads/2024/09/pc-new-logo.svg"  width={100} alt="" />
        </div>  
          <ul className={style.navUl}>
            <li>
              <Link to="/dashboard" className={style.NavLink}>
              <div className={style.Icon}><i class="fa-solid fa-house"></i></div>
                
                <span>Dashboard</span>
              </Link>
              
            </li>
            <li>
              <Link to="/showUser" className={style.NavLink}>
              <div className={style.Icon}><i class="fa-solid fa-arrow-pointer"></i></div>
                <span>Agency</span>
              </Link>
            </li>
            <li>
              <Link to="" className={style.NavLink}>
              <div className={style.Icon}><i class="fa-solid fa-calendar-days"></i></div>
                <span>Task / Calender</span>
              </Link>
            </li>
            <li>
              <Link to="/email" className={style.NavLink}>
              <div className={style.Icon}><i class="fa-regular fa-envelope"></i></div>
                <span>Email</span>
              </Link>
            </li>
            <li>
              <Link to="/coordinate" className={style.NavLink}>
              <div className={style.Icon}><i class="fa-solid fa-users"></i></div>

                <span>Coordinate</span>
              </Link>
            </li>
            <li>
              <Link to="" className={style.NavLink}>
              
              <div className={style.Icon}><i class="fa-solid fa-gear"></i></div>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
         {isOpen?'': <button className={`${style.ToggleButton}  `} onClick={()=> setIsOpen(true)}>
             <i class="fa-solid fa-bars"></i>
          </button>}
    </>
  );
}

export default SideBar;
