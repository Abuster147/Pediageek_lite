import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IParams, IBlog, RootStore } from "../../utils/TypeScript";
import { getAPI } from "../../utils/FetchData";

import Loading from "../../components/global/Loading";
import { showErrMsg } from "../../components/alert/Alert";
import DisplayBlog from "../../components/blog/DisplayBlog";
import Helmetglobal from "../../components/global/Helmetglobal";
import Sidebar from "../../components/blog/Sidebar";
import Recomended from "../../components/blog/Recomended";
import Sidebard from "../../components/ads/Sidebard";

const DetailBlog = () => {
  const id = useParams<IParams>().slug;
  const { socket } = useSelector((state: RootStore) => state);
  const [blog, setBlog] = useState<IBlog>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setLoading(false);
      });

    return () => setBlog(undefined);
  }, [id]);

  // Join Room
  useEffect(() => {
    if (!id || !socket) return;
    socket.emit("joinRoom", id);

    return () => {
      socket.emit("outRoom", id);
    };
  }, [socket, id]);

  if (loading) return <Loading />;
  return (
    <>
      {blog &&
        typeof blog.thumbnail === "string" &&
        typeof blog.category === "object" && (
          <Helmetglobal
            title={blog.title}
            description={blog.description}
            keyword={blog.category.name}
            twitterimage={blog.thumbnail}
            ogimage={blog.thumbnail}
            ogdescription={blog.description}
            ogurl={`https://www.pediageek.com/blog/${blog._id}`}
            twitterdescription={blog.description}
            ogtitle={blog.title}
            twittertitle={blog.title}
          />
        )}

      <div className="my-2">
        {error && showErrMsg(error)}

        {blog && (
          <div className="home_page my-2 row justify-content-evenly position-relative">
            <div style={{ maxWidth: "622px" }} className="col-12 col-lg-7 px-0">
              <DisplayBlog blog={blog} />
            </div>
            <div
              className="col-12 col-lg-4 position-sticky px-0"
              style={{ maxHeight: "100vh", top: 60 }}
            >
              <Sidebar blog={blog} setBlog={setBlog} />
            </div>
          </div>
        )}
        {blog && (
          <div className="home_page my-2 row justify-content-evenly position-relative">
            <div style={{ maxWidth: "622px" }} className="col-12 col-lg-8 px-0">
              <Recomended blog={blog} />
            </div>
            <div
              className="col-12 col-lg-4 position-sticky"
              style={{ maxHeight: "100vh", top: 0 }}
            >
              <Sidebard />
              <Sidebard />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailBlog;
