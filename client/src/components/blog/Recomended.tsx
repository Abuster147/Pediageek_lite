import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { IBlog, Recomended, RootStore } from "../../utils/TypeScript";
import CardVert from "../cards/CardVert";
import Loading from "../global/Loading";
import Homevert from "../ads/Homevert";
import { getAPI } from "../../utils/FetchData";
export interface IProps {
  blog: IBlog;
}
const Sidebar: React.FC<IProps> = ({ blog }) => {
  const { homeBlogs, categories, darkMode, auth } = useSelector(
    (state: RootStore) => state
  );
  const { isdarkMode } = darkMode;
  const [page, setPage] = useState(0);
  const [blogs, setBlogs] = useState<Recomended[]>();
  useEffect(() => {
    setTimeout(() =>
      getAPI(`simmilarblogs?blog=${blog._id}&page=${page}`)
        .then((res) => {
          setBlogs(res.data);
          setPage(page + 1);
        })
        .catch((err) => {
          console.log(err);
        }),500
    );
  }, [blog]);

  const fetchMore = () => {
    getAPI(`simmilarblogs?blog=${blog._id}&page=${page}`)
      .then((res) => {
        setBlogs(blogs?.concat(res.data));
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div
        className={`bg-${isdarkMode ? "dark" : "light"} p-3 text-${
          isdarkMode ? "white" : "black"
        } mt-2 mb-1`}
      >
        <h5 className="fw-bold">
          Recomending more based on your recent Activity...
        </h5>
      </div>
      <InfiniteScroll
        dataLength={page * 8} //This is important field to render the next data
        next={fetchMore}
        hasMore={page * 8 < 100}
        loader={<Loading />}
        scrollThreshold={0.8}
        endMessage={
          <p
            style={{
              textAlign: "center",
              color: isdarkMode ? "white" : "black",
            }}
          >
            <b>Yay! You have seen it all.</b>
          </p>
        }
      >
        <div className={`home_blogs my-2`}>
          {blogs &&
            blogs.map((blogi, index) => (
              <>
                <CardVert key={index} blog={blogi} />
              </>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Sidebar;
