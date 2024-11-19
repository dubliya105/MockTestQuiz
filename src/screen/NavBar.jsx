import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../assets/styles/NavBar.module.css'
export default function NavBar() {
const navigate =useNavigate()
  const auth = JSON.parse(localStorage.getItem("user"));

  
   const loguot=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/')
   }

  return (
    <div className={`shadow-sm ${style.navBar} d-flex justify-content-end`}>
        <nav className="navbar navbar-expand-lg navbar-light pe-4 ">
        <i class="fa-regular fa-bell px-3"></i>
            <div className="dropdown dropdown-toggle p-2">
                <Link className="  text-decoration-none text-dark bg-transparent" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className='rounded-3 me-1' width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAACUCAMAAAAZKm3XAAAAMFBMVEXk5ueutLersbTn6erq7O3IzM7h4+S3vL/T1tjd4OGorrHa3d6yuLvQ09XEyMq6v8KQewOIAAAEmUlEQVR4nO2c22LbIAxADQJzh///25k43eLUTQ3IkZLlvG4PnIJAJhLT9OHDhw8fPnz4DwGlJhcqbp6UAurxNKOUS9kYEy8YU7J1oKhH1YJyOQopNkgRs3ud2UjC3wlcNbxIM/XgjhC08HsCK15oN/GeDAg6PjC4WETtGEsAJLO7iO4sTAKuFjDn+0DeR4rMdCrAxkMGF4sYWEqkY5NwlZCJerw76AaDitfsZkL/sh3xl4B2hWU9sZKA1oV0hZEEpC6DhcRFAmyvghRMtliYS99KqhKGSQ6YuxVqXFOPvgJ2QGHZYS2H1XQ8w9idiEjvoHLHybCR0OSfqDCosECtoEYC+komngg3bCCEcaQKgDAN1CnHbBAUZKGciP5EaQvpGYGylITMhBlHOHKNcQDCqMZaSqQJR+enzzcIMz/Xn3TfOZCl4BAijsICnQPSNCwBEYgcpoTnQHVjNuOcDhWZqTYmrJBeMEQOKMnSFaqvuRlvWxKCygFRQdIoTDNeOAj/cfi/HfAU6BwQ9yWymH6HvRXzjKO6Yyp4DoUqX8L6jKPM+d4g936Hb6B3+BZFvBMoVApvcTeDdkcmCe/I3OvfVeLdGRMqvMXd/YTzGwppscA7/JY1TQgKkeyickUhHBHUv+1OMOwQyUtnuqrgbvGJehoWxs45SXXTestgBu55VJKNrCbPogZrmkZq4WiPt38MfAsZNrXr/YWVLArhVqDzdoBV3XpfrTSbCt0VSC9fs94hwaModEtLG0qtkmaoULfY4+eELDyO52/ArOXBniY981SovWW2HIgKbwLnNj+Y0289fjImtpPwFy0f9VpKzSRDeggoa/bbzKSI9lU6dwGCLiYKeYOIsegX6j1eUOCszqUUs1BKzto6tk2iPwPLmGd37cWHFxS4KKgbXkqijhxcsElf1tLKspaSDW79R+oRPmT5W88hZbMG8/2mtEZ20VWFo0cdkwupCO/3nxK4cVn+S8x2iRFOh3UNXZvr+B+PfiMiY06BydMCUDfREn/76+95SFkWD2qNZV3by/JvFvjyECZryoMDVMgm9gt8acSSJpo710tahEXUJA+5pEfpaTPeP/mpB5jcw8dMupAyh6d9WMCBx0w6LYp9zi5VP9UQCyrvLLI9f5Oqz7G0vKPRbBFPjwvlEOvffrI49woTdMd53GFxXlSAOyWUd/D2LAe88r1fOaeFFBxe58wRCYN/HwsWqVTpsAR6FYeyZ26oP1gU1BRKPTEUbiQi4nkHo283dEvgnXdPjeatBNbPFGQKdXtCkcApFeuXQFhOGEVWQxJxXIFkR9pImMEtFrG0vp/B/g6MZ0yGGXt7bT79a+EQcSR30tSjXxnYnCBQD/6L/oLw+cmp6gNkbxkv8cmwobNHHLOldRjf9eIXxgtXiPQ0xcJMk2//RE8XoEJ8tAGH5gwWWJzQG5rL81WmHvI3mhufMPuKsWhMm9A63xBprqtmF9Gi9tw0TURguJQaa3o5LqXm5+M4pUr/aNqZ0JqKcZEtAYHY3I1Jy/vyLG4Cdmj6FLK88r2/tLS78wzptnZAXp8ONzQ4FMkTv7u5/gEDKEOcZi6GAwAAAABJRU5ErkJggg==" alt="" />
                    {auth?auth.name:''}
                </Link>
                <ul className="dropdown-menu " aria-labelledby="dropdownMenu2">
                    <li><button className="dropdown-item" type="button">profile</button></li>
                    <li><button className="dropdown-item" type="button">Setting</button></li>
                    <li><button className="dropdown-item" type="button" onClick={()=>{ loguot()}}>Logout</button></li>
                </ul>
            </div>
        </nav>  
    </div>
  )
}
