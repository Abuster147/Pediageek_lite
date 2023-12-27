import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { IBlog, ICategory, RootStore } from "../../utils/TypeScript";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Onlytick from "../profile/Onlytick";
import Homeuser from "../profile/SingleFollower";
import Follow from "../profile/Follow";
import { useSelector } from "react-redux";
import { isDeepStrictEqual } from "util";

TimeAgo.addDefaultLocale(en);
interface IProps {
  blog: IBlog;
  ispromoted?: boolean;
  category?: string;
}

const CardVert: React.FC<IProps> = ({ blog, ispromoted, category }) => {
  const { auth, darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  const timeAgo = new TimeAgo("en-US");

  return (
    <div
      className={`card border-0 my-3 pt-1 bg-${isdarkMode ? "dark" : "light"}`}
    >
      {blog.user && typeof blog.user !== "string" && (
        <div className="mx-3">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Link
              to={`/profile/${blog.user._id}`}
              className="text-decoration-none"
            >
              <div className="d-flex flex-row align-items-center">
                <img
                  className="rounded-circle"
                  src={blog.user.avatar}
                  width="40"
                  height="40"
                  style={{ marginRight: 4 }}
                />
                <div className="d-flex flex-column align-items-start ml-2">
                  <span
                    className="fw-bold"
                    style={{ color: isdarkMode ? "white" : "#003300" }}
                  >
                    {blog.user.name}
                    <Onlytick role={blog.user.role} />
                  </span>
                  <span className="followers text-muted">
                    <small>
                      {blog.user.follower.length} Followers
                      {ispromoted && ", Ads"}
                    </small>
                  </span>
                </div>
              </div>
            </Link>
            <div
              className="d-flex flex-row align-items-center"
              style={{ marginTop: -10 }}
            >
              <Follow user={blog.user} />
            </div>
          </div>
        </div>
      )}
      <Link
        to={`/blog/${blog._id}`}
        style={{
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        <div className=" mt-2 position-relative">
          {blog.thumbnail && (
            <>
              {typeof blog.thumbnail === "string" ? (
                <Link to={`/blog/${blog._id}`}>
                  <picture
                    style={{
                      display: "block",
                      position: "relative",
                      paddingTop: "56.25%",
                      backgroundSize: "cover",
                      height: "40vh",
                    }}
                  >
                    <img
                      src={blog.thumbnail}
                      className="card-img"
                      alt={blog.title}
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </picture>
                </Link>
              ) : (
                <picture
                  style={{
                    display: "block",
                    position: "relative",
                    paddingTop: "66.67%",
                  }}
                >
                  {" "}
                  <img
                    src={URL.createObjectURL(blog.thumbnail)}
                    className="card-img"
                    alt={blog.title}
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </picture>
              )}
            </>
          )}

          {/* {typeof blog.thumbnail === "string" && (
            <img
              src={blog.thumbnail}
              className="card-img"
              alt="..."
              style={{ height: "180px", objectFit: "cover" }}
            />
          )} */}
        </div>
      </Link>
      <div className="card-body container">
        <h6 className="card-title">
          {" "}
          <Link
            to={`/blog/${blog._id}`}
            style={{
              textDecoration: "none",
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: isdarkMode ? "white" : "#003300",
            }}
          >
            {blog.title}
          </Link>
        </h6>
        <div
          className="text-muted d-flex justify-content-between my-2"
          style={{ color: "white" }}
        >
          <div className={`views`}>
            {" "}
            {timeAgo.format(new Date(blog.createdAt))}
          </div>
          <div className={`stats `}>
            <i className="far fa-eye "></i>
            {blog.views != undefined ? millify(blog.views) : 0}
            {"   "}
            <i className="far fa-thumbs-up"></i>
            {blog.like != undefined ? millify(blog.like) : 0}
            {"   "}
            <i className="far fa-comment"></i>
            {blog.comment != undefined ? millify(blog.comment) : 0}
          </div>
        </div>
        <p
          className={`card-text`}
          style={{ color: isdarkMode ? "white" : "#003300" }}
        >
          {blog.description}
        </p>
      </div>
      {/* <div className={`card-footer text-muted d-flex justify-content-between py-1 `}
      style={{backgroundColor:isdarkMode?'#4a4848':'#cccaca'}}>
      </div> */}
    </div>
  );
};

export default CardVert;
