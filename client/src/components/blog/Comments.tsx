import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { IBlog, IComment, IUser, RootStore } from "../../utils/TypeScript";
import Follow from "../profile/Follow";
import React, { useCallback, useEffect, useState } from "react";
import Input from "../comments/Input";
import Comments from "../comments/Comments";
import Loading from "../global/Loading";
import Pagination from "../global/Pagination";
import { createComment, getComments } from "../../redux/actions/commentAction";
interface IProps {
  blog: IBlog;
}

const Sidebar: React.FC<IProps> = ({ blog }) => {
  const { auth, comments, darkMode } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
  const [showComments, setShowComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const history = useHistory();
  useEffect(() => {
    setShowComments(comments.data);
  }, [comments.data]);

  const fetchComments = useCallback(
    async (id: string, num = 1) => {
      setLoading(true);
      await dispatch(getComments(id, num));
      setLoading(false);
    },
    [dispatch]
  );
  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      replyCM: [],
      createdAt: new Date().toISOString(),
    };
    setShowComments([data, ...showComments]);
    dispatch(createComment(data, auth.access_token));
  };

  useEffect(() => {
    if (!blog._id) return;
    const num = history.location.search.slice(6) || 1;
    fetchComments(blog._id, num);
  }, [blog._id, fetchComments, history]);

  const handlePagination = (num: number) => {
    if (!blog._id) return;
    fetchComments(blog._id, num);
  };
  return (
    <div
      className={`bg-${
        isdarkMode ? "dark" : "light"
      } my-1 p-3  example position-relative`}
      style={{ maxHeight: "60vh", overflowY: "scroll" }}
    >
      {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5 className={`text-${isdarkMode ? "light" : "dark"}`}>
          <Link to={`/login?blog/${blog._id}`}>Login</Link> to like and comment.
        </h5>
      )}

      {loading ? (
        <Loading />
      ) : (
        showComments?.map((comment, index) => (
          <Comments key={index} comment={comment} />
        ))
      )}
      {comments.total > 1 && (
        <Pagination total={comments.total} callback={handlePagination} />
      )}
    </div>
  );
};

export default Sidebar;
