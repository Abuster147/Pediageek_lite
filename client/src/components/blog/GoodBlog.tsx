import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "../../redux/reducers/authReducer";
import { likeBlog, unlikeBlog } from "../../redux/actions/blogAction";
import { IBlog, RootStore } from "../../utils/TypeScript";
import ShareBlog from "./ShareBlog";
import { useHistory } from "react-router-dom";
export interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const GoodBlog: React.FC<IProps> = ({ blog, setBlog }) => {
  const { auth, comments, darkMode } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [sharebox, setSharebox] = useState(false);
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState(0);
  const [share, setShare] = useState(0);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    if (blog.like) setLike(blog.like);
    if(blog.comment) setComment(blog.comment)
    if (blog.likeuser && auth.user)
      if (blog.likeuser.every((user) => auth.user?._id !== user)) {
        setLiked(false);
      } else {
        setLiked(true);
      }
  }, [blog, auth]);
  const handellike = () => {
    if (!auth.access_token) history.push(`/login?blog/${blog._id}`);
    setLike(like + 1);
    setLiked(!liked);
    if (auth.access_token) dispatch(likeBlog(blog, auth.access_token));
  };
  const history = useHistory();
  const handelunlike = () => {
    if (!auth.access_token) history.push(`/login?blog/${blog._id}`);
    setLike(like - 1);
    setLiked(!liked);
    if (auth.access_token) dispatch(unlikeBlog(blog, auth.access_token));
  };

  return (
    <>
      <div
        className={`bg-${
          isdarkMode ? "dark" : "light"
        } py-3 px-sm-1 px-md-2 px-lg-3 text-${
          isdarkMode ? "white" : "black"
        } border-black`}
      >
        <div className="d-flex justify-content-around ">
          {!liked ? (
            <div onClick={handellike}>
              <i className="far fa-thumbs-up fa-lg good">
                <small>&nbsp;{like}</small>
              </i>
            </div>
          ) : (
            <div onClick={handelunlike}>
              <i className="fas fa-thumbs-up text-primary fa-lg good">
                <small>&nbsp;{like}</small>
              </i>
            </div>
          )}

          <div>
            <i className="far fa-comment fa-lg good">
              <small>&nbsp;{comment}</small>
            </i>
          </div>
          <div>
            <i className="far fa-eye fa-lg good">
              <small>&nbsp;{blog.views}</small>
            </i>
          </div>
          <div onClick={(e) => setSharebox(!sharebox)}>
            <i className="far fa-share-square fa-lg good">
              {/* <small>&nbsp;{share}</small> */}
            </i>
          </div>

          {/* <div>
            <i className="far fa-flag fa-lg good"> </i>
          </div> */}
        </div>
      </div>
      {sharebox && (
        <div className={`my-1 bg-${isdarkMode ? "dark" : "light"} p-3`}>
          <ShareBlog blog={blog} />
        </div>
      )}
    </>
  );
};

export default GoodBlog;
