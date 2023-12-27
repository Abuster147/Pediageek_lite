import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IBlog, RootStore, IUser, IComment } from "../../utils/TypeScript";
import "react-quill/dist/quill.snow.css";
import Input from "../comments/Input";
import Comments from "../comments/Comments";
import Loading from "../global/Loading";
import Pagination from "../global/Pagination";
import { createComment, getComments } from "../../redux/actions/commentAction";
import { getAPI, patchAPI, putAPI } from "../../utils/FetchData";
import { Timer, Time, TimerOptions } from "timer-node";
import Abovepost from "../ads/Adsabovepost.jsx";
import Footerads from "../ads/Footerads";
import Follow from "../profile/Follow";
import Onlytick from "../profile/Onlytick";
import Social from "./ShareBlog";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
interface IProps {
  blog: IBlog;
}

const timer = new Timer({ label: "usertime" });
const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comments, darkMode } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
  const [showComments, setShowComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const history = useHistory();
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  

  return (
    <div className={`bg-${isdarkMode ? "dark" : "light"} mb-1`}>
      <div>
        <Abovepost imageurl={blog.thumbnail} imagealt={blog.title} />
      </div>
      <h1
        className="text-center my-3 text-capitalize fs-1"
        style={{ color: isdarkMode ? "white" : "black" }}
      >
        <b>{blog.title}</b>
      </h1>
      <hr
        style={{ color: isdarkMode ? "white" : "black" }}
        className="mx-1 mx-md-2"
      />
      <div className="d-flex flex-wrap justify-content-around">
        <div>
          {blog.user && typeof blog.user !== "string" && (
            <div className="px-1">
              <div className="d-flex flex-row justify-content-between align-items-center ">
                <Link
                  to={`/profile/${blog.user._id}`}
                  className="text-decoration-none"
                >
                  <div className="d-flex flex-row align-items-center">
                    <img
                      className="rounded-circle"
                      src={blog.user.avatar}
                      width="35"
                      height="35"
                    />
                    <div className="d-flex flex-column align-items-start ml-2">
                      <span className="font-weight-bold mx-2">
                        {blog.user.name}
                        <Onlytick role={blog.user.role} />
                      </span>
                      <span
                        className={`followers mx-2 text-${
                          isdarkMode ? "light" : "dark"
                        }`}
                      >
                        <small className="text-muted">
                          {blog.user.follower.length} Followers,{" "}
                          <i className="fas fa-globe"></i>{" "}
                          {timeAgo.format(new Date(blog.createdAt))}
                        </small>
                      </span>
                    </div>
                  </div>
                </Link>
                <div
                  className="d-flex flex-row align-items-center position-relative"
                  style={{ marginTop: -10 }}
                >
                  <Follow user={blog.user} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <Social blog={blog} />
        </div>
      </div>
      <hr
        style={{ color: isdarkMode ? "white" : "black" }}
        className="mx-1 mx-md-2"
      />

      <div className="ql-snow p-1 p-md-2 p-lg-3">
        <div
          className="ql-editor p-0"
          dangerouslySetInnerHTML={{
            __html: blog.content
              .replaceAll(
                '<img width="100%" src',
                '<img width="100%" style="border-radius:4px; max-Height:70vh; margin:10px 0px;" src'
              )
              .replaceAll(
                "<img src",
                '<img style="border-radius:4px; max-Height:70vh; margin:10px 0px;" src'
              ),
          }}
          style={{
            fontSize: "18px",
            lineHeight: 1.5,
            wordBreak: "break-word",
            color: isdarkMode ? "white" : "black",
          }}
        />
      </div>
      <hr className="my-1" />
    </div>
  );
};

export default DisplayBlog;
