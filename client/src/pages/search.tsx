import React from 'react'
import { useState, useEffect } from 'react'
import { getAPI } from '../utils/FetchData'
import Header from '../components/global/Header'
import Footer from '../components/global/Footer'
import { IBlog, ICategory, IUser,RootStore } from '../utils/TypeScript'
import CardHoriz from '../components/cards/CardHoriz'
import Loading from '../components/global/Loading'
import { Link, useLocation } from 'react-router-dom'
import {useSelector } from "react-redux";
import Follow from '../components/profile/Follow'
import Onlytick from '../components/profile/Onlytick'
import InfiniteScroll from "react-infinite-scroll-component";
import SearchComponent from '../components/global/Search'

const Search=()=> {

    const [blogs, setBlogs] = useState<IBlog[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const location = useLocation<{
      params: any;
   }>()
    const search = location.state.params
    console.log(search)
    const { darkMode } = useSelector((state: RootStore) => state);
    const {isdarkMode}=darkMode;
    let count =1;

    useEffect(() => {
      const delayDebounce = setTimeout(async () => {
        if (search.length < 2) return setCategories([]);
        try {
          getAPI(`search/category?title=${search}`).then((res) => {
            setCategories(res.data)
          }).catch(err => {
            setCategories([])
          })
        } catch (err) {
          console.log(err)
        }
      }, 1000)
      return () => clearTimeout(delayDebounce)
    }, [search])
  
    useEffect(() => {
      const delayDebounce = setTimeout(async () => {
        if (search.length < 2) return setUsers([]);
        try {
          getAPI(`search/user?title=${search}`).then((res) => {
            setUsers(res.data)
          }).catch(err => {
            setUsers([])
          })
        } catch (err) {
          console.log(err)
        }
      }, 1000)
      return () => clearTimeout(delayDebounce)
    }, [search])


    useEffect(() => {
      const delayDebounce = setTimeout(async () => {
        if (search.length < 2) return setBlogs([]);
        try {
          getAPI(`search/blogs?title=${search}&page=${page}`).then((res) => {
            setBlogs(res.data)
            setTotal(res.data.total)
          }).catch(err => {
            setBlogs([])
          })
        } catch (err) {
          console.log(err)
        }
      }, 1000)
      return () => clearTimeout(delayDebounce)
    }, [search])
  
    useEffect(() => {
      const delayDebounce = setTimeout(async () => {
        if (search.length < 2) return setBlogs([]);
  
        try {
          const resblog = await getAPI(`search/blogs?title=${search}&page=${page}`)
          if (resblog.status === 200 || resblog.status === 304){
            setBlogs(resblog.data)
            setTotal(resblog.data.total)}
          else setBlogs([])
        } catch (err) {
          console.log(err)
        }
      }, 1000)
  
      return () => clearTimeout(delayDebounce)
    }, [search])
  
      
    const fetchMore=()=>{
      count++
      setPage(count)
    }

  return (
    <>
      <div className='d-md-none d-block'><SearchComponent></SearchComponent></div>
      <div className="d-none d-md-flex home_page my-2 row justify-content-evenly position-relative">
            <div
              style={{ maxWidth: "622px" }}
              className="col-12 col-lg-7 px-0 order-2 order-md-1 my-2"
            >
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
            {
              blogs && blogs?.length
              ?
              blogs.map(blog => (
                <CardHoriz key={blog._id} blog={blog} />
              ))
              : <div className='my-3 text-center'><Loading />
                <h3>
                  No Matching Blogs for this search.
                </h3>
              </div>
            }
            </InfiniteScroll>
            </div>
            <div
              className="col-12 col-lg-4 order-1 order-md-2 my-2"
              style={{ maxHeight: "100vh" }}
            >
              <nav>
                <div className="nav nav-pills nav-fill mt-2 mb-1" id="search-tab" role="tablist">
                  <button className="nav-link" id="search-user-tab" data-bs-toggle="tab" data-bs-target="#search-user" type="button" role="tab" aria-controls="search-user" aria-selected="false">Accounts</button>
                  <button className="nav-link" id="search-category-tab" data-bs-toggle="tab" data-bs-target="#search-category" type="button" role="tab" aria-controls="search-category" aria-selected="false">Categories</button>
                </div>
              </nav>

              <>
              <div className="tab-content my-3 position-relative pt-2 px-1 w-100 rounded mt-2" id="nav-tabContent"
                style={{
                  background: isdarkMode?'black':'#eee', zIndex: 10,
                  height: 'calc(100vh - 200px)',
                  overflow: 'scroll'
                }}>

                <div className="tab-pane fade" id="search-user" role="tabpanel" aria-labelledby="search-user-tab" tabIndex={0}>
                            <div className="row">
                              {users?.length
                                ?
                                users.map((user, index) => (
                                  <div className="pr-1 px-md-3 col-md-6">
                                    <div className="d-flex flex-row justify-content-between align-items-center ">
                                      <Link to={`/profile/${user._id}`} className="text-decoration-none">
                                        <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={user.avatar} width="55" height="55" />
                                          <div className="d-flex flex-column align-items-start ml-2"><span className="font-weight-bold mx-2">{user.name}<Onlytick role={user.role} /></span><span className={`followers mx-2`}>{user.follower.length} Followers</span></div>
                                        </div>
                                      </Link>
                                      <div className="d-flex flex-row align-items-center mt-2"><Follow user={user} /></div>
                                    </div>
                                    <hr />
                                  </div>
                                )) : <div className='my-3 text-center'><Loading />
                                  <h3>
                                    No Matching Users for this search.
                                  </h3>
                                </div>
                              }
                            </div>
                          </div>
                          <div className="tab-pane fade" id="search-category" role="tabpanel" aria-labelledby="search-category-tab" tabIndex={0}>
                            {categories && categories.length ? categories.map((category, index) => (
                              <Link to={`/blogs/${category.name}`} key={index}
                                className={`btn btn-tag rounded-pill m-2 px-2 `} >
                                {category.name}</Link>
                            )) : <div className='my-3 text-center'><Loading />
                              <h3>
                                No Matching categories for this search.
                              </h3>
                            </div>
                            }
                          </div>
                        </div>
                      </>
            </div>
          </div>
          </>
  )
}

export default Search
