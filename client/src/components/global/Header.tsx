import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import '../../styles/search.css'
import Menu from "./Menu";
import Search from "./Search";
import Notification from "../profile/Notification";
import GooglePrompt from "../auth/GooglePrompt";
import Referal from "./Referal";
import { useDispatch, useSelector } from "react-redux";
import { IParams, RootStore, INotification } from "../../utils/TypeScript";
import { useEffect, useState } from "react";
// import "../../styles/header.css";

import { logout } from "../../redux/actions/authAction";
import { notificationRead } from "../../redux/actions/notificationAction";
import { handledarkMode } from "../../redux/actions/DarkModeAction";

import Category from "./Categories";

import { getNotifications } from "../../redux/actions/notificationAction";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Pagination from "../global/Pagination";
TimeAgo.addLocale(en);

const Header = () => {
  $("#staticBackdrop1").on("shown.bs.modal", function () {
    $("#searchbox").trigger("focus");
  });

  const timeAgo = new TimeAgo("en-US");
  const { auth, notification, darkMode } = useSelector(
    (state: RootStore) => state
  );
  const [msg, setMsg] = useState<INotification[]>();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (auth.access_token) {
      dispatch(getNotifications(auth));
    }
  }, [dispatch, history, auth]);

  useEffect(() => {
    document.getElementById("closebtn")?.click();
  }, [history.location.pathname]);

  useEffect(() => {
    setMsg(notification.data);
  }, [notification]);

  const { isdarkMode } = darkMode;

  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };
  useEffect(() => {
    document.body.style.backgroundColor = isdarkMode ? "#181818" : "#fff";
  }, [isdarkMode]);

  const { pathname } = useLocation();
  let url = history.location.pathname;
  url = url.substring(1);
  const bfLoginLinks = [
    {
      label: " Login",
      class: "fas fa-sign-in-alt",
      path: `/login?${url}`,
    },
    {
      label: "Register",
      class: "fas fa-user-plus",
      path: `/register?${url}`,
    },
  ];

  const afLoginLinks = [
    { label: "Create Blog", class: "fas fa-edit", path: "/create_blog" },
  ];

  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;

  const isActive = (pn: string) => {
    if (pn === pathname) return "active";
  };

  const handleLogout = () => {
    if (!auth.access_token) return;
    dispatch(logout(auth.access_token));
  };
  const Read = () => {
    dispatch(notificationRead(auth));
  };

  const [searchText, setSearchText] = useState(null)
  const [showSearchBox, setShowSearchBox] = useState(false)

  const handleOnChange=(e)=>{
    setSearchText(e.target.value)
  }

  const handleKeyDown=(e)=>{
    if(e.key === 'Enter' && searchText !=null ){
      history.push('/search',{params:searchText})
    }
  }

  return (
    <>
      <div>
        <nav
          className={`navbar navbar-expand navbar-${
            isdarkMode ? "dark" : "light"
          } bg-${
            isdarkMode ? "dark" : "light"
          } px-md-2 bottom  d-md-none d-block`}
          style={{
            position: "fixed",
            left: 0,
            zIndex: 9,
            overflow: "hidden",
            bottom: "0",
            width: "100%",
          }}
        >
          <div id="navbarNav">
            <Menu />
          </div>
        </nav>
      </div>

      <div className="d-none d-md-block position-relative">
        <div
          className={` p-3 text-${isdarkMode ? "white" : "primary"} bg-${
            isdarkMode ? "dark" : "light"
          } `}
          style={{ height: "100vh", position: "fixed", width: "24%" }}
        > <div className={`d-flex w-100 ${showSearchBox?"justify-content-around":"justify-content-between"}`} style={{width:"100%"}}>
            <div className={`${showSearchBox?"visually-hidden":""}`}>
              <Link
                className="navbar-brand fw-bolder mx-4 text-white"
                to="/"
                style={{ letterSpacing: 0 }}
              >
                <span style={{ color: isdarkMode ? "white" : "black" }}>
                  {" "}
                  Pedia
                </span>
                <span style={{ color: "#00e600" }}>Geek</span>
              </Link>
            </div>
            <div className={`d-flex rounded-pill justify-self-end ${showSearchBox?"visually-hidden":""}`} style={{backgroundColor:"transparent", margin:'0px', padding:'0px'}} onClick={()=>{setShowSearchBox(true)}}>
            <i className="fa fa-search mx-3 align-self-center" style={{color:"#00e600"}}/>
            </div>

            <div className={`search-box d-flex rounded-pill justify-content-between border border-1 ${!showSearchBox?"visually-hidden":""}`} style={{backgroundColor:"white", margin:'0px', padding:'4px', width:"80%", height:"auto"}}> <input type="text" placeholder="Search" style={{border:"none", marginLeft:"3%", outline:"none", fontSize:"1rem", width:"fit-content"}} onChange={handleOnChange} onKeyDown={handleKeyDown}/>
            <i className="fa fa-search mx-3 align-self-center justify-self-end" style={{color:"black"}}/>
            </div>
            <div className={`align-self-center m-0 p-0 w-auto ${!showSearchBox?"visually-hidden":""}`} onClick={()=>{setShowSearchBox(false)}}>
              <i className="fa fa-times" style={{transition: "none"}}></i>
            </div>
          </div>

          <hr />
          <ul className="nav flex-column mb-auto">
            <li className="nav-item my-2">
              <Link
                to="/"
                className={`nav-link text-${
                  isdarkMode ? "white" : "black"
                }  fs-5`}
              >
                <i className="fas fa-home mx-3"></i>
                <span style={{ marginLeft: 2 }}>Home</span>
              </Link>
            </li>

            {/* Notification code starts  */}

            <li className="my-2">
              <div className="fs-5" style={{ cursor: "pointer" }}>
                <span
                  className={`nav-link text-${
                    isdarkMode ? "white" : "black"
                  }  fs-5`}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop1"
                >
                  <i className="fas fa-search mx-3"></i> Search
                </span>
              </div>
            </li>

            {/* Notification code starts  */}
            {auth.access_token && (
              <li className="my-2">
                <div
                  className="fs-5"
                  style={{ cursor: "pointer", zIndex: "100" }}
                >
                  <span
                    className={`nav-link text-${
                      isdarkMode ? "white" : "black"
                    }  fs-5`}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
                    onClick={Read}
                  >
                    <i className="fas fa-bell position-relative mx-3">
                      {auth.user?.notice && (
                        <span className="position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-light rounded-circle">
                          <span className="visually-hidden">New alerts</span>
                        </span>
                      )}
                    </i>{" "}
                    Notifications
                  </span>
                </div>
              </li>
            )}
            {/* Notification code ends */}

            {navLinks.map((link, index) => (
              <li key={index} className={`my-2`}>
                <span className="nav-item">
                  <Link
                    className={`nav-link text-${
                      isdarkMode ? "white" : "black"
                    }  fs-5`}
                    to={link.path}
                  >
                    <i
                      className={`${link.class} mx-3`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={link.label}
                    ></i>
                    {link.label}
                  </Link>
                </span>
              </li>
            ))}

            <li className={`my-2`}>
              <span className="nav-item">
                <a
                  className={`nav-link text-${
                    isdarkMode ? "white" : "black"
                  } fs-5`}
                >
                  <i
                    className={`fas fa-${isdarkMode ? "moon" : "sun"} text-${
                      isdarkMode ? "white" : "black"
                    } mx-3 fs-5`}
                    style={{ cursor: "pointer" }}
                    onClick={switchDarkMode}
                  ></i>
                  <span
                    onClick={switchDarkMode}
                    style={{ cursor: "pointer", marginLeft: "4px" }}
                  >
                    {isdarkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </a>
              </span>
            </li>

            <li className={`my-2`} style={{ cursor: "pointer" }}>
              <span className="nav-item">
                <span
                  className={`nav-link fs-5 text-${
                    isdarkMode ? "white" : "black"
                  } `}
                  data-bs-toggle="modal"
                  data-bs-target="#referalmodal"
                >
                  <i
                    className="fas fa-bullhorn mx-3 "
                    style={{ marginRight: 2 }}
                  ></i>
                  Refer and Earn
                </span>
              </span>
            </li>
          </ul>

          <div
            className="mx-3 position-absolute d-flex flex-wrap position-absolute text-center"
            style={{ bottom: "1%" }}
          >
            <div>
              {auth.user && (
                <div className="nav-item dropdown my-2">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={auth.user.avatar}
                      alt="avatar"
                      className="avatar"
                    />{" "}
                    <span
                      className={`fs-5 text-${isdarkMode ? "white" : "black"}`}
                    >
                      {auth.user.name}
                    </span>
                  </span>

                  <ul
                    className={` dropdown-menu dropdown-menu-end my-1 bg-${
                      isdarkMode ? "dark" : "light"
                    } text-${isdarkMode ? "white" : "black"}`}
                    aria-labelledby="navbarDropdown"
                    style={{ zIndex: 8 }}
                  >
                    <li>
                      <Link
                        className={`dropdown-item text-${
                          isdarkMode ? "white" : "black"
                        }`}
                        to={`/profile/${auth.user._id}`}
                      >
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={`dropdown-item text-${
                          isdarkMode ? "white" : "black"
                        }`}
                        to="/"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <small>
              <span>
                <Link
                  to="/about_us"
                  className={`dropdown-item text-${
                    isdarkMode ? "white" : "black"
                  }`}
                >
                  About Us
                </Link>
              </span>
              <span>
                <Link
                  className={`dropdown-item text-${
                    isdarkMode ? "white" : "black"
                  }`}
                  to="/privacy_policy"
                >
                  Privacy Policy
                </Link>
              </span>
              <span>
                <Link
                  className={`dropdown-item text-${
                    isdarkMode ? "white" : "black"
                  }`}
                  to="/disclaimer"
                >
                  Disclaimer
                </Link>
              </span>
              <span
                className="text-center p-4"
                style={{ color: isdarkMode ? "white" : "black" }}
              >
                © 2022 Copyright:
                <a
                  className="text-reset text-capitalize text-decoration-none"
                  href="http://pediageek.com/"
                >
                  {" "}
                  PediaGeek
                </a>
              </span>
            </small>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel1"
        aria-hidden="true"
      >
        <div className={`modal-dialog modal-lg `}>
          <div className={`modal-content bg-${isdarkMode ? "dark" : "light"} `}>
            <div className="modal-header">
              <h5
                className={`modal-title text-${isdarkMode ? "white" : "black"}`}
                id="staticBackdropLabel1"
              >
                Search For Blogs,accounts and tags.
              </h5>
              <button
                type="button"
                className={`btn-close btn-close-${
                  isdarkMode ? "white" : "black"
                }`}
                data-bs-dismiss="modal"
                aria-label="Close"
                id="searchclose"
              ></button>
            </div>
            <div className="modal-body">
              <Search />
            </div>
          </div>
        </div>
      </div>

      <Referal />
      <Notification />
      <GooglePrompt />
    </>
  );
};

export default Header;
