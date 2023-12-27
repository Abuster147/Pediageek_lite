import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getBlogsByCategoryId,
  getCategoryBySearch,
} from "../../redux/actions/blogAction";

import { RootStore, IParams, IBlog } from "../../utils/TypeScript";

import Loading from "../../components/global/Loading";
import Pagination from "../../components/global/Pagination";
import CardVert from "../../components/cards/CardVert";
import Referal from "../../components/global/Referal";
import Helmetglobal from "../../components/global/Helmetglobal";
import Homevert from "../../components/ads/Homevert";
import Sidebard from "../../components/ads/Sidebard";
import InfiniteScroll from "react-infinite-scroll-component";

const BlogsByCategory = () => {
  const { categories, blogsCategory, darkMode } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
  const { slug } = useParams<IParams>();
  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  const history = useHistory();
  const { search } = history.location;

  useEffect(() => {
    const category = categories.find((item) => item.name === slug);
    if (category?._id) {
      setCategoryId(category._id);
      // dispatch(getBlogsByCategoryId(categoryId, search));
      dispatch(getCategoryBySearch(category._id, slug, 1));
    }
  }, [slug, history, categories]);

  useEffect(() => {
    if (!categoryId) return;
    // if (blogsCategory.every((item) => item.id !== categoryId)) {
    //   dispatch(getCategoryBySearch(categoryId, slug, 1));
    // } else {
    const data = blogsCategory.find((item) => item.id === categoryId);
    if (!data) return;
    setBlogs(data.blogs);
    setTotal(data.total);
    setPage(data.page);
    // if (data.search) history.push(data.search);
    // }
  }, [categoryId, blogsCategory, dispatch, search, history]);

  // const handlePagination = (num: number) => {
  //   const search = `?page=${num}`;
  //   dispatch(getBlogsByCategoryId(categoryId, search));
  // };

  const fetchMore = () => {
    dispatch(getCategoryBySearch(categoryId, slug, page));
  };

  if (!blogs) return <Loading />;
  return (
    <div className="my-2">
      <Helmetglobal
        title={`${slug} Blogs`}
        description={`Blogs from ${slug} category.`}
        keyword={slug}
      />

      <div className="home_page my-2 row justify-content-evenly position-relative">
        <div style={{ maxWidth: "622px" }} className="col-12 col-lg-7 px-0">
          <div className="home_blogs">
            <InfiniteScroll
              dataLength={page * 8} //This is important field to render the next data
              next={fetchMore}
              hasMore={blogs.length < total}
              loader={<Loading />}
              scrollThreshold={0.6}
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
              <div className="show_blogs">
                {blogs.map((blog) => (
                  <>
                    <CardVert key={blog._id} blog={blog} />
                  </>
                ))}
              </div>{" "}
            </InfiniteScroll>
          </div>
        </div>
        <div
          className="col-12 col-lg-4 position-sticky"
          style={{ maxHeight: "100vh", top: 0 }}
        >
          <Sidebard />
          <Sidebard />
        </div>
      </div>
    </div>
  );
};

export default BlogsByCategory;
