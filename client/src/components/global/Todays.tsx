import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { RootStore } from "../../utils/TypeScript";
import { Link } from "react-router-dom";

const Todays = () => {
  const { darkMode, auth } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;

  return (
    <>
      {/* <div className="container my-2" style={{ maxWidth: 622 }}>
        <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
      </div> */}

      {/* {(auth.user?.country == "india" || !auth.user?.country) && (
        <div
          className={`card mb-3 bg-${isdarkMode ? "dark" : "light"} text-${
            isdarkMode ? "white" : "black"
          }`}
          style={{ minWidth: "260px" }}
        >
          <div className="row g-0 p-md-2">
            <div
              className="col-md-4"
              style={{
                minHeight: "150px",
                maxHeight: "170px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://res.cloudinary.com/aababcab/image/upload/v1660210224/blog/IMG-20220811-WA0001_p781fa.jpg"
                className="w-100 h-100"
                alt="thumbnail"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="badge bg-primary">
                  <i className="fab fa-hotjar"></i> Trending in India
                </p>
                <h5 className="card-title">
                  <strong>Happy raksha bandhan</strong>
                </h5>
                <h6
                  className={`card-text`}
                  style={{ color: isdarkMode ? "white" : "#003300" }}
                >
                  It is a time to celebrate the eternal bond of Love, Care,
                  Trust, and Togetherness... PediaGeek On the occasion of Raksha
                  Bandhan, PediaGeek wishes you and your loving sibling a very
                  happy and prosperous festival time.
                </h6>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {auth.user && (!auth.user.country || !auth.user.state) && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>
            <i className="fas fa-newspaper"></i>
          </strong>{" "}
          Update your profile to stay updated with your locality.{" "}
          <Link to={`/profile/${auth.user._id}`}>
            Click here <i className="fas fa-angle-double-right"></i>
          </Link>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {!auth.user && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>
            <i className="fas fa-newspaper"></i>
          </strong>{" "}
          Sign in to read stories near by you.{" "}
          <Link to="/login">
            Click here <i className="fas fa-angle-double-right"></i>
          </Link>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
};

export default Todays;
