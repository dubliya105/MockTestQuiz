/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../assets/styles/NavBar.module.css";
import Cookies from "universal-cookie";
import { usersContext } from "../components/context/UserContext";

export default function NavBar() {
  const navigate = useNavigate();
  const {userData} = useContext(usersContext);
  const [fillterData, setFillterData] = useState([]);
  const [search, setSearch] = useState('');
  const cookies = new Cookies();
  
  const allData = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Email", link: "/email" },
    { name: "Agency", link: "/showUser" },
    { name: "Coordinate", link: "/coordinate" },
    { name: "Mock Test", link: "/mocktest" },
    { name: "Quiz", link: "/mockTestQuiz" },
    { name: "Blog", link: "/blog" },
    { name: "Packages", link: "/package" },
    { name: "Show Blogs", link: "/showblogs" },
    { name: "Create Exam / Add", link: "/createExam" },
    { name: "Create Exam / View", link: "/bharatSATexam" },
  ];

  const loguot = () => {
    cookies.remove("user");
    cookies.remove("token");
    navigate("/");
  };
  const handleSearchData = (value) => {
    setSearch(value);
    if (value) {
      setFillterData(
        allData.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFillterData([]);
    }
  };
  return (
    <div className={`shadow-sm ${style.navBar} d-flex justify-content-between`}>
      <div className="dropdown ps-5 py-3 ">
        <input
          type="search"
          placeholder="Search....."
          className={`form-control ${search?'show':''}`}
          id="dropdownMenuButton2"
          onChange={(e) => handleSearchData(e.target.value.trim())}
        />

        <ul
           className="dropdown-menu dropdown-menu-dark dropdown-menu-end show"
           style={{display: search ? 'block' : 'none', position: 'absolute', inset: '0px 0px auto auto', margin: 0, transform: 'translate3d(-16.5px, 55.5px, 0px)'}}
          aria-labelledby="dropdownMenuButton2"
        >
          {fillterData.length !== 0 ? (
            fillterData.map((item, index) => (
              <li key={index}>
                <Link className="dropdown-item" to={item.link}>
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            search&&<li className="px-3">
              No Data Found!
            </li>
          )}
        </ul>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light flex-nowrap">
        <i className="fa-regular fa-bell px-3"></i>
        <div className="d-flex dropdown  p-2">
          <Link
            className=" d-flex text-decoration-none text-dark bg-transparent"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              className="rounded-3 me-1"
              width={30}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAACUCAMAAAAZKm3XAAAAMFBMVEXk5ueutLersbTn6erq7O3IzM7h4+S3vL/T1tjd4OGorrHa3d6yuLvQ09XEyMq6v8KQewOIAAAEmUlEQVR4nO2c22LbIAxADQJzh///25k43eLUTQ3IkZLlvG4PnIJAJhLT9OHDhw8fPnz4DwGlJhcqbp6UAurxNKOUS9kYEy8YU7J1oKhH1YJyOQopNkgRs3ud2UjC3wlcNbxIM/XgjhC08HsCK15oN/GeDAg6PjC4WETtGEsAJLO7iO4sTAKuFjDn+0DeR4rMdCrAxkMGF4sYWEqkY5NwlZCJerw76AaDitfsZkL/sh3xl4B2hWU9sZKA1oV0hZEEpC6DhcRFAmyvghRMtliYS99KqhKGSQ6YuxVqXFOPvgJ2QGHZYS2H1XQ8w9idiEjvoHLHybCR0OSfqDCosECtoEYC+komngg3bCCEcaQKgDAN1CnHbBAUZKGciP5EaQvpGYGylITMhBlHOHKNcQDCqMZaSqQJR+enzzcIMz/Xn3TfOZCl4BAijsICnQPSNCwBEYgcpoTnQHVjNuOcDhWZqTYmrJBeMEQOKMnSFaqvuRlvWxKCygFRQdIoTDNeOAj/cfi/HfAU6BwQ9yWymH6HvRXzjKO6Yyp4DoUqX8L6jKPM+d4g936Hb6B3+BZFvBMoVApvcTeDdkcmCe/I3OvfVeLdGRMqvMXd/YTzGwppscA7/JY1TQgKkeyickUhHBHUv+1OMOwQyUtnuqrgbvGJehoWxs45SXXTestgBu55VJKNrCbPogZrmkZq4WiPt38MfAsZNrXr/YWVLArhVqDzdoBV3XpfrTSbCt0VSC9fs94hwaModEtLG0qtkmaoULfY4+eELDyO52/ArOXBniY981SovWW2HIgKbwLnNj+Y0289fjImtpPwFy0f9VpKzSRDeggoa/bbzKSI9lU6dwGCLiYKeYOIsegX6j1eUOCszqUUs1BKzto6tk2iPwPLmGd37cWHFxS4KKgbXkqijhxcsElf1tLKspaSDW79R+oRPmT5W88hZbMG8/2mtEZ20VWFo0cdkwupCO/3nxK4cVn+S8x2iRFOh3UNXZvr+B+PfiMiY06BydMCUDfREn/76+95SFkWD2qNZV3by/JvFvjyECZryoMDVMgm9gt8acSSJpo710tahEXUJA+5pEfpaTPeP/mpB5jcw8dMupAyh6d9WMCBx0w6LYp9zi5VP9UQCyrvLLI9f5Oqz7G0vKPRbBFPjwvlEOvffrI49woTdMd53GFxXlSAOyWUd/D2LAe88r1fOaeFFBxe58wRCYN/HwsWqVTpsAR6FYeyZ26oP1gU1BRKPTEUbiQi4nkHo283dEvgnXdPjeatBNbPFGQKdXtCkcApFeuXQFhOGEVWQxJxXIFkR9pImMEtFrG0vp/B/g6MZ0yGGXt7bT79a+EQcSR30tSjXxnYnCBQD/6L/oLw+cmp6gNkbxkv8cmwobNHHLOldRjf9eIXxgtXiPQ0xcJMk2//RE8XoEJ8tAGH5gwWWJzQG5rL81WmHvI3mhufMPuKsWhMm9A63xBprqtmF9Gi9tw0TURguJQaa3o5LqXm5+M4pUr/aNqZ0JqKcZEtAYHY3I1Jy/vyLG4Cdmj6FLK88r2/tLS78wzptnZAXp8ONzQ4FMkTv7u5/gEDKEOcZi6GAwAAAABJRU5ErkJggg=="
              alt=""
            />
           <span className="d-none d-sm-block"> {userData.name ? userData.name : ""}</span>
          </Link>
          <ul className="dropdown-menu " aria-labelledby="dropdownMenu2">
            <li>
              <button className="dropdown-item" type="button">
                profile
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Setting
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => {
                  loguot();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
