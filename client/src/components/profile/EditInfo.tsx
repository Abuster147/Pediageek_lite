import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootStore,
  InputChange,
  IUserProfile,
  FormSubmit,
  IName,
} from "../../utils/TypeScript";
import NotFound from "../global/NotFound";
import { updateUser, resetPassword } from "../../redux/actions/userAction";
import { getAPI, postAPI } from "../../utils/FetchData";
import {
  updateLocation,
  updateOtherInfo,
} from "../../redux/actions/preferanceAction";
import React from "react";
export interface search {
  name: string;
  value: string;
}
const initState = {
  name: "",
  account: "",
  avatar: "",
  password: "",
  cf_password: "",
  about: "",
  referer: "",
  country: "",
  city: "",
  state: "",
  locality: "",
  gender: "",
  organization: "",
  work: "",
  aspire: "",
};

const EditInfo = () => {
  const [namelist, setNamelist] = useState<IName[]>([]);
  const [searchname, setSearchname] = useState<search>();
  const { auth, darkMode } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
  const [user, setUser] = useState<IUserProfile>(initState);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const gender = document.getElementById("gender") as HTMLInputElement;
    if (auth.user && auth.user.gender) gender.value = auth.user.gender;
  }, []);

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleChangename = (e: any, name: string, id: string) => {
    const value = e.target.innerText.toLowerCase();
    setUser({ ...user, [name]: value });
    const a = document.getElementById(name) as HTMLInputElement;
    if (a) a.value = e.target.innerText;
    close(id);
  };

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setUser({ ...user, avatar: file });
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (avatar || name || about)
      dispatch(updateUser(avatar as File, name, about, auth));

    if (gender || work || aspire || birthday || organization)
      dispatch(
        updateOtherInfo(gender, work, aspire, organization, auth, birthday)
      );

    if (locality || city || state || country)
      dispatch(updateLocation(locality, city, state, country, auth));

    if (password && auth.access_token)
      dispatch(resetPassword(password, cf_password, auth.access_token));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setNamelist([]);
      try {
        if (searchname?.name !== undefined) {
          const res = await getAPI(
            `search${searchname?.name}?${searchname?.name}=${searchname?.value}`
          );
          setNamelist(res.data);
          console.log(namelist);
        }
      } catch (err) {
        console.log(err);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchname, user]);

  function showhide(id) {
    const app = document.getElementById(id);
    if (app) app.style.display = "block";
  }
  function close(id) {
    const app = document.getElementById(id);
    if (app) app.style.display = "none";
  }
  const addname = async (name: string, id: string) => {
    if (auth.access_token) {
      postAPI("add" + name, { work: searchname?.value }, auth.access_token)
        .then((res) => {
          const value = res.data.name;
          setUser({ ...user, [name]: value });
        })
        .catch((err) => {
          console.log(err);
        });
      close(id);
    }
  };

  const {
    name,
    avatar,
    password,
    cf_password,
    about,
    gender,
    locality,
    country,
    state,
    city,
    organization,
    work,
    aspire,
    birthday,
  } = user;
  if (!auth.user) return <NotFound />;

  return (
    <div
      className="modal fade"
      id="profileModal"
      tabIndex={-1}
      aria-labelledby="profileModalLabel"
      aria-hidden="true"
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className={`modal-header bg-${isdarkMode ? "dark" : "light"}`}>
              <h5
                className={`modal-title text-${isdarkMode ? "white" : "black"}`}
                id="profileModalLabel"
              >
                Update Profile
              </h5>
              <button
                type="button"
                className={`btn-close btn-close-${
                  isdarkMode ? "white" : "dark"
                }`}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div
              className={`modal-body profile_info position-relative bg-${
                isdarkMode ? "dark" : "light"
              }`}
            >
              <nav>
                <div
                  className="nav nav-pills nav-fill mb-1"
                  id="Profile-nav"
                  role="tablist"
                >
                  <button
                    className="nav-link active"
                    id="basic-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#basic"
                    type="button"
                    role="tab"
                    aria-controls="search-all"
                    aria-selected="true"
                  >
                    Basic
                  </button>
                  <button
                    className="nav-link"
                    id="other-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#other"
                    type="button"
                    role="tab"
                    aria-controls="seacrh-blog"
                    aria-selected="false"
                  >
                    More Info
                  </button>
                  <button
                    className="nav-link"
                    id="location-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#location"
                    type="button"
                    role="tab"
                    aria-controls="search-user"
                    aria-selected="false"
                  >
                    Home Town
                  </button>
                  <button
                    className="nav-link"
                    id="password-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#password"
                    type="button"
                    role="tab"
                    aria-controls="search-category"
                    aria-selected="false"
                  >
                    Password
                  </button>
                </div>
              </nav>
              <div
                className="tab-content example position-relative pt-2 px-1 w-100 rounded mt-2"
                id="nav-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="basic"
                  role="tabpanel"
                  aria-labelledby="basic-tab"
                  tabIndex={0}
                >
                  <div className="container-md">
                    <div className="info_avatar">
                      <img
                        src={
                          avatar
                            ? URL.createObjectURL(avatar)
                            : auth.user.avatar
                        }
                        alt="avatar"
                      />

                      <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input
                          type="file"
                          accept="image/*"
                          name="file"
                          id="file_up"
                          onChange={handleChangeFile}
                        />
                      </span>
                    </div>
                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        defaultValue={auth.user.name}
                        onChange={handleChangeInput}
                      />
                    </div>

                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label htmlFor="account">Account</label>
                      <input
                        type="text"
                        className="form-control"
                        id="account"
                        name="account"
                        defaultValue={auth.user.account}
                        onChange={handleChangeInput}
                        disabled={true}
                      />
                    </div>

                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label htmlFor="about">About</label>
                      <textarea
                        className="form-control"
                        id="about"
                        name="about"
                        defaultValue={auth.user.about}
                        onChange={handleChangeInput}
                        rows={4}
                        maxLength={200}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="other"
                  role="tabpanel"
                  aria-labelledby="nav-drafts-tab"
                  tabIndex={0}
                >
                  <div className="container-md">
                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        className="form-control"
                        name="gender"
                        defaultValue={auth.user.gender}
                        onChange={handleChangeInput}
                        placeholder="Select Gender"
                      >
                        <option value="n">Not Specify</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                      </select>
                    </div>
                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label htmlFor="bd">Date Of Birth</label>
                      <input
                        id="bd"
                        className="form-control"
                        type="date"
                        name="birthday"
                        onChange={handleChangeInput}
                        defaultValue={
                          auth.user.birthday
                            ? auth.user.birthday.substring(0, 10)
                            : ""
                        }
                      />
                      <span
                        id="startDateSelected"
                        style={{ cursor: "pointer" }}
                      ></span>
                    </div>

                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label id="worklabel" htmlFor="work">
                        I am a
                      </label>
                      <input
                        defaultValue={auth.user.work}
                        autoComplete="off"
                        id="work"
                        name="work"
                        type="text"
                        className="form-control me-2 w-100"
                        placeholder="Teacher,Student,Bussiness man"
                        onFocus={(e) => {
                          showhide("work-auto");
                          setSearchname({
                            name: "work",
                            value: e.target.value,
                          });
                        }}
                        onChange={(e) =>
                          setSearchname({ name: "work", value: e.target.value })
                        }
                      />
                    </div>
                    <div
                      className="container pt-2 px-1 w-100 rounded position-relative"
                      id="work-auto"
                      style={{
                        marginTop: 2,
                        background: "#cbcaca",
                        zIndex: 10,
                        maxWidth: 450,
                        overflow: "auto",
                        paddingBottom: 3,
                        display: "none",
                      }}
                    >
                      <span
                        className="btn btn-secondary p-1 position-absolute"
                        style={{ right: 5 }}
                        onClick={(e) => {
                          close("work-auto");
                        }}
                      >
                        &times;
                      </span>
                      {namelist.length ? (
                        <p style={{ color: "black" }}>Select One...</p>
                      ) : (
                        <></>
                      )}
                      {namelist.length === 0 ? (
                        <button
                          className="btn btn-light py-1 m-1"
                          onClick={(e) => addname("work", "work-auto")}
                        >
                          Add to Options
                        </button>
                      ) : (
                        <>
                          {namelist.map((name) => (
                            <span
                              className="btn btn-success py-1 m-1"
                              key={name._id}
                              id={name._id}
                              onClick={(e) => {
                                handleChangename(e, "work", "work-auto");
                              }}
                              style={{ textTransform: "capitalize" }}
                            >
                              {name.name}
                            </span>
                          ))}
                        </>
                      )}
                    </div>

                    {(auth.user.work === "student" ||
                      user.work === "student") && (
                      <>
                        <div
                          className={`form-group my-3 text-${
                            isdarkMode ? "white" : "black"
                          }`}
                        >
                          <label id="aspirelabel" htmlFor="aspire">
                            I want to be a
                          </label>
                          <input
                            autoComplete="off"
                            defaultValue={auth.user.aspire}
                            id="aspire"
                            name="work"
                            type="text"
                            className="form-control me-2 w-100"
                            placeholder="Teacher,Student,Bussiness man"
                            onFocus={(e) => {
                              showhide("aspire-auto");
                              setSearchname({
                                name: "work",
                                value: e.target.value,
                              });
                            }}
                            onChange={(e) =>
                              setSearchname({
                                name: "work",
                                value: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div
                          className="container pt-2 px-1 w-100 rounded position-relative"
                          id="aspire-auto"
                          style={{
                            marginTop: 2,
                            background: "#cbcaca",
                            zIndex: 10,
                            maxWidth: 450,
                            overflow: "auto",
                            paddingBottom: 3,
                            display: "none",
                          }}
                        >
                          <span
                            className="btn btn-secondary p-1 position-absolute"
                            style={{ right: 5 }}
                            onClick={(e) => {
                              close("aspire-auto");
                            }}
                          >
                            &times;
                          </span>
                          {namelist.length ? (
                            <p style={{ color: "black" }}>Select One...</p>
                          ) : (
                            <></>
                          )}
                          {namelist.length === 0 ? (
                            <button
                              className="btn btn-light py-2 m-1 pb-2"
                              onClick={(e) => addname("aspire", "aspire-auto")}
                            >
                              Add to Options
                            </button>
                          ) : (
                            <>
                              {namelist.map((name) => (
                                <span
                                  className="btn btn-tag py-1 m-1"
                                  key={name._id}
                                  id={name._id}
                                  onClick={(e) => {
                                    handleChangename(
                                      e,
                                      "aspire",
                                      "aspire-auto"
                                    );
                                  }}
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {name.name}
                                </span>
                              ))}
                            </>
                          )}
                        </div>
                      </>
                    )}
                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label id="organizationlabel" htmlFor="organization">
                        Organization
                      </label>
                      <input
                        autoComplete="off"
                        id="organization"
                        name="organization"
                        type="text"
                        className="form-control me-2 w-100"
                        placeholder="Pediageek, Microsoft, Apple"
                        onFocus={(e) => {
                          showhide("organization-auto");
                          setSearchname({
                            name: "organization",
                            value: e.target.value,
                          });
                        }}
                        onChange={(e) =>
                          setSearchname({
                            name: "organization",
                            value: e.target.value,
                          })
                        }
                        defaultValue={auth.user.organization}
                      />
                    </div>
                    <div
                      className="container pt-2 px-1 w-100 rounded position-relative"
                      id="organization-auto"
                      style={{
                        marginTop: 2,
                        background: "#cbcaca",
                        zIndex: 10,
                        maxWidth: 450,
                        overflow: "auto",
                        paddingBottom: 3,
                        display: "none",
                      }}
                    >
                      <span
                        className="btn btn-secondary p-1 position-absolute"
                        style={{ right: 5 }}
                        onClick={(e) => {
                          close("organization-auto");
                        }}
                      >
                        &times;
                      </span>
                      {namelist.length ? (
                        <p style={{ color: "black" }}>Select One...</p>
                      ) : (
                        <></>
                      )}
                      {namelist.length === 0 ? (
                        <button
                          className="btn btn-light py-2 m-1 pb-2"
                          onClick={(e) =>
                            addname("organization", "organization-auto")
                          }
                        >
                          Add to Options
                        </button>
                      ) : (
                        <>
                          {namelist.map((name) => (
                            <span
                              className="btn btn-tag py-1 m-1"
                              key={name._id}
                              id={name._id}
                              onClick={(e) => {
                                handleChangename(
                                  e,
                                  "organization",
                                  "organization-auto"
                                );
                              }}
                              style={{ textTransform: "capitalize" }}
                            >
                              {name.name}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="location"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                  tabIndex={0}
                >
                  <div className="container-md">
                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label id="countrylabel" htmlFor="country">
                        Country
                      </label>
                      <input
                        autoComplete="off"
                        id="country"
                        name="country"
                        type="text"
                        className="form-control me-2 w-100"
                        placeholder="ex. United states,India,United Kingdom"
                        onFocus={(e) => {
                          showhide("country-auto");
                          setSearchname({
                            name: "country",
                            value: e.target.value,
                          });
                        }}
                        onChange={(e) =>
                          setSearchname({
                            name: "country",
                            value: e.target.value,
                          })
                        }
                        defaultValue={auth.user.country}
                      />
                    </div>
                    <div
                      className="container pt-2 px-1 w-100 rounded position-relative"
                      id="country-auto"
                      style={{
                        marginTop: 2,
                        background: "#cbcaca",
                        zIndex: 10,
                        maxWidth: 450,
                        overflow: "auto",
                        paddingBottom: 3,
                        display: "none",
                      }}
                    >
                      <span
                        className="btn btn-secondary p-1 position-absolute"
                        style={{ right: 5 }}
                        onClick={(e) => {
                          close("country-auto");
                        }}
                      >
                        &times;
                      </span>
                      {namelist.length ? (
                        <p style={{ color: "black" }}>Select One...</p>
                      ) : (
                        <></>
                      )}
                      {namelist.length === 0 ? (
                        <button
                          className="btn btn-light py-2 m-1 pb-2"
                          onClick={(e) => addname("country", "country-auto")}
                        >
                          Add to Options
                        </button>
                      ) : (
                        <>
                          {namelist.map((name) => (
                            <span
                              className="btn btn-success py-1 m-1"
                              key={name._id}
                              id={name._id}
                              onClick={(e) => {
                                handleChangename(e, "country", "country-auto");
                              }}
                              style={{ textTransform: "capitalize" }}
                            >
                              {name.name}
                            </span>
                          ))}
                        </>
                      )}
                    </div>

                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label id="statelabel" htmlFor="state">
                        State
                      </label>
                      <input
                        autoComplete="off"
                        id="state"
                        name="state"
                        type="text"
                        className="form-control me-2 w-100"
                        placeholder="Enter your State"
                        onFocus={(e) => {
                          showhide("state-auto");
                          setSearchname({
                            name: "state",
                            value: e.target.value,
                          });
                        }}
                        onChange={(e) =>
                          setSearchname({
                            name: "state",
                            value: e.target.value,
                          })
                        }
                        defaultValue={auth.user.state}
                      />
                    </div>
                    <div
                      className="container pt-2 px-1 w-100 rounded position-relative"
                      id="state-auto"
                      style={{
                        marginTop: 2,
                        background: "#cbcaca",
                        zIndex: 10,
                        maxWidth: 450,
                        overflow: "auto",
                        paddingBottom: 3,
                        display: "none",
                      }}
                    >
                      <span
                        className="btn btn-secondary p-1 position-absolute"
                        style={{ right: 5 }}
                        onClick={(e) => {
                          close("state-auto");
                        }}
                      >
                        &times;
                      </span>
                      {namelist.length ? (
                        <p style={{ color: "black" }}>Select One...</p>
                      ) : (
                        <></>
                      )}
                      {namelist.length === 0 ? (
                        <button
                          className="btn btn-light py-2 m-1 pb-2"
                          onClick={(e) => addname("state", "state-auto")}
                        >
                          Add to Options
                        </button>
                      ) : (
                        <>
                          {namelist.map((name) => (
                            <span
                              className="btn btn-tag py-1 m-1"
                              key={name._id}
                              id={name._id}
                              onClick={(e) => {
                                handleChangename(e, "state", "state-auto");
                              }}
                              style={{ textTransform: "capitalize" }}
                            >
                              {name.name}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label id="citylabel" htmlFor="city">
                        City
                      </label>
                      <input
                        autoComplete="off"
                        id="city"
                        name="city"
                        type="text"
                        className="form-control me-2 w-100"
                        placeholder="Enter your city"
                        onFocus={(e) => {
                          showhide("city-auto");
                          setSearchname({
                            name: "city",
                            value: e.target.value,
                          });
                        }}
                        onChange={(e) =>
                          setSearchname({
                            name: "city",
                            value: e.target.value,
                          })
                        }
                        defaultValue={auth.user.city}
                      />
                    </div>
                    <div
                      className="container pt-2 px-1 w-100 rounded position-relative"
                      id="city-auto"
                      style={{
                        marginTop: 2,
                        background: "#cbcaca",
                        zIndex: 10,
                        maxWidth: 450,
                        overflow: "auto",
                        paddingBottom: 3,
                        display: "none",
                      }}
                    >
                      <span
                        className="btn btn-secondary p-1 position-absolute"
                        style={{ right: 5 }}
                        onClick={(e) => {
                          close("city-auto");
                        }}
                      >
                        &times;
                      </span>
                      {namelist.length ? (
                        <p style={{ color: "black" }}>Select One...</p>
                      ) : (
                        <></>
                      )}
                      {namelist.length === 0 ? (
                        <button
                          className="btn btn-light py-2 m-1 pb-2"
                          onClick={(e) => addname("city", "city-auto")}
                        >
                          Add to Options
                        </button>
                      ) : (
                        <>
                          {namelist.map((name) => (
                            <span
                              className="btn btn-tag py-1 m-1"
                              key={name._id}
                              id={name._id}
                              onClick={(e) => {
                                handleChangename(e, "city", "city-auto");
                              }}
                              style={{ textTransform: "capitalize" }}
                            >
                              {name.name}
                            </span>
                          ))}
                        </>
                      )}
                    </div>

                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label htmlFor="locality">Locality</label>

                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="locality"
                        name="locality"
                        defaultValue={auth.user.locality}
                        onChange={handleChangeInput}
                        placeholder="Enter your landmark."
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="password"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                  tabIndex={0}
                >
                  <div className="container-md">
                    {auth.user.type !== "register" && (
                      <small className="text-danger">
                        * Quick login account with {auth.user.type} can't use
                        this function *
                      </small>
                    )}
                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label htmlFor="password">Password</label>

                      <div className="pass">
                        <input
                          autoComplete="off"
                          type={typePass ? "text" : "password"}
                          className="form-control"
                          id="password"
                          name="password"
                          value={password}
                          onChange={handleChangeInput}
                          disabled={auth.user.type !== "register"}
                        />

                        <small
                          onClick={() => setTypePass(!typePass)}
                          style={{ color: "black" }}
                        >
                          {typePass ? "Hide" : "Show"}
                        </small>
                      </div>
                    </div>

                    <div
                      className={`form-group my-3 text-${
                        isdarkMode ? "white" : "black"
                      }`}
                    >
                      <label htmlFor="cf_password">Confirm Password</label>

                      <div className="pass">
                        <input
                          autoComplete="off"
                          type={typeCfPass ? "text" : "password"}
                          className="form-control"
                          id="cf_password"
                          name="cf_password"
                          value={cf_password}
                          onChange={handleChangeInput}
                          disabled={auth.user.type !== "register"}
                        />

                        <small
                          onClick={() => setTypeCfPass(!typeCfPass)}
                          style={{ color: "black" }}
                        >
                          {typeCfPass ? "Hide" : "Show"}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className={`btn btn-${isdarkMode ? "primary" : "dark"} w-100`}
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
