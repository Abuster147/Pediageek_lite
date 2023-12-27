import { Link, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import { logout } from "../../redux/actions/authAction";
import { notificationRead } from "../../redux/actions/notificationAction";
import { handledarkMode } from "../../redux/actions/DarkModeAction";
import "../../styles/notification.css"

const Menu = () => {
  const { auth, notification, darkMode } = useSelector(
    (state: RootStore) => state
  );
  const { isdarkMode } = darkMode;

  const [btnTxt, setbtnTxt] = useState();
  const dispatch = useDispatch();
  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };
  useEffect(() => {
    document.body.style.backgroundColor = isdarkMode ? "#181818" : "#fff";
  }, [isdarkMode]);
  const history = useHistory();
  const { pathname } = useLocation();
  let url = history.location.pathname;
  url = url.substring(1);
  const bfLoginLinks = [
    {
      label: "Login",
      class: "fas fa-sign-in-alt fa-lg",
      path: `/login?${url}`,
    },
    {
      label: "Register",
      class: "fas fa-user-plus fa-lg",
      path: `/register?${url}`,
    },
  ];

  const afLoginLinks = [
    { label: "Create", class: "fas fa-edit fa-lg", path: "/create_blog" },
  ];

  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;

  const isActive = (pn: string) => {
    if (pn === pathname) return "active";
  };

  const handleLogout = () => {
    if (!auth.access_token) return;
    dispatch(logout(auth.access_token));
    $("#canvasclose").trigger("click");
  };
  const Read = () => {
    dispatch(notificationRead(auth));
  };
  useEffect(() => {
    $("#canvasclose").trigger("click");
  }, [pathname]);

  return (
    <>
      <ul className="navbar-nav ms-auto ml-1 w-100 d-flex justify-content-around">
        {/* <li className=" " style={{ cursor: "pointer" }}>
          <span className="nav-link">
            <div
              className={`btn text-${isdarkMode ? "light" : "dark"} bg-${
                isdarkMode ? "dark" : "light"
              }`}
              data-bs-toggle="modal"
              data-bs-target="#referalmodal"
              style={{
                cursor: "pointer",
                marginTop: "-10px",
                marginLeft: "-15px",
                marginRight: "-15px",
              }}
            >
              {" "}
              <img
                src="Refer.png"
                alt=""
                style={{
                  height: "3vh",
                  filter: isdarkMode ? "invert(1)" : "none",
                }}
              />
            </div>
          </span>
        </li>*/}
        {/* <li className="" style={{ cursor: "pointer" }}>
          <i
            className={`nav-link fas fa-${isdarkMode ? "moon" : "sun"} `}
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={switchDarkMode}
          ></i>
        </li> */}
        <li className="" style={{ cursor: "pointer" }}>
          <Link to={"/"} className="text-decoration-none nav-link">
            <i className="fas fa-home fa-lg"></i>
          </Link>
        </li>
        {navLinks.map((link, index) => (
          <li key={index} className={`  ${isActive(link.path)}`}>
            <Link className="nav-link" to={link.path}>
              <i
                className={`${link.class}`}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={link.label}
              ></i>
            </Link>
          </li>
        ))}
        <li className="" style={{ cursor: "pointer" }}>
          <span
            className="nav-link"
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop1"
            onClick={()=>{history.push('/search',{params:""})}}
          >
            <i className="fas fa-search fa-lg"></i>
          </span>
        </li>

        {auth.user && (
          <li className="notification dropdown text-cenetr" style={{ cursor: "pointer" }}>
            <span
              className="nav-link"
              data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasWithBothOptions"
                  aria-controls="offcanvasWithBothOptions"
              onClick={Read}
            >
              <i className="fas fa-bell fa-lg position-relative">
                {auth.user.notice && (
                  <span className="position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span>
                )}
              </i>
            </span>
          </li>
        )}
        <li>
          <div className="d-md-none">
            <>
              {auth.user ? (
                <li
                  className="nav-item dropdown text-cenetr"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
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
                    />
                  </span>
                </li>
              ) : (
                <li
                  className="nav-item dropdown text-cenetr"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </span>
                </li>
              )}
              <div
                className={`offcanvas offcanvas-end bg-${
                  isdarkMode ? "dark" : "light"
                } text-${isdarkMode ? "white" : "primary"}`}
                tabIndex={-1}
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div className="offcanvas-header">
                  <h5 id="offcanvasRightLabel">
                    <Link
                      className="navbar-brand  mx-4 text-white"
                      to="/"
                      style={{ letterSpacing: 0 }}
                    >
                      <b>
                        <span style={{ color: isdarkMode ? "white" : "black" }}>
                          {" "}
                          Pedia
                        </span>
                        <span style={{ color: "#00e600" }}>Geek</span>
                      </b>
                    </Link>
                  </h5>
                  <button
                    type="button"
                    className={`btn-close btn-close-${isdarkMode?'white':'black'} text-reset`}
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    id="canvasclose"
                  />
                </div>
                <div className={`offcanvas-body `}>
                  <ul style={{ listStyle: "none", textDecoration: "none" }}>
                    <li>
                      <Link
                        className={`text-${
                          isdarkMode ? "white" : "black"
                        } text-decoration-none fs-5 my-5`}
                        to="/about_us"
                      >
                        <i className="fas fa-users "></i>
                        <span className="mx-2"> About PediaGeek</span>
                      </Link>
                    </li>
                    <li className="my-5">
                      <Link
                        to="/privacy_policy"
                        className={`text-${
                          isdarkMode ? "white" : "black"
                        } fs-5 text-decoration-none`}
                      >
                        <i className="fas fa-hand-paper"></i>
                        <span className="mx-2"> Privacy Policy</span>
                      </Link>
                    </li>
                    <li className="fs-5 my-5">
                      <Link
                        to="/disclaimer"
                        className={`text-${
                          isdarkMode ? "white" : "black"
                        } text-decoration-none`}
                      >
                        <i className="fas fa-exclamation-triangle"></i>
                        <span className="mx-2"> Disclaimer</span>
                      </Link>
                    </li>
                    <li className="fs-5 " style={{ cursor: "pointer" }}>
                      <i
                        className={` fas fa-${isdarkMode ? "moon" : "sun"} `}
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                        onClick={switchDarkMode}
                      ></i>
                      <span className="mx-3" onClick={switchDarkMode}>
                        {isdarkMode ? "Light Mode" : "Dark Mode"}
                      </span>
                    </li>
                    <li className="fs-5 my-5">
                      <span
                        className="my-5 fs-5"
                        data-bs-toggle="modal"
                        data-bs-target="#referalmodal"
                      >
                        <i
                          className={` fas fa-bullhorn `}
                          style={{ fontSize: "1.5rem", cursor: "pointer" }}
                        ></i>
                        <span className="mx-3">Refer and Earn</span>
                      </span>
                    </li>

                    {auth.user ? (
                      <>
                        <li className="fs-5 my-5">
                          <Link
                            className={`text-${
                              isdarkMode ? "white" : "black"
                            } text-decoration-none`}
                            to={`/profile/${auth.user._id}`}
                          >
                            <i className="fas fa-user"></i>
                            <span className="mx-2"> Profile</span>
                          </Link>
                        </li>
                        <li className="fs-5 my-5">
                          <Link
                            to="/"
                            className={`text-${
                              isdarkMode ? "white" : "black"
                            } text-decoration-none `}
                            onClick={handleLogout}
                          >
                            {/* <i className="fas fa-sign-out"></i> */}
                            <i className="fas fa-sign-out-alt"></i>
                            <span className="mx-2"> Logout</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Menu;
