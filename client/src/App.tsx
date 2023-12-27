import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import PageRender from "./PageRender";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";

import { Alert } from "./components/alert/Alert";

import { refreshToken } from "./redux/actions/authAction";
import { getCategories } from "./redux/actions/categoryAction";
import { getHomeBlogs } from "./redux/actions/blogAction";

import io from "socket.io-client";

import SocketClient from "./SocketClient";
import Category from "./components/global/Categories";
import Search from "./components/global/Search";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    const socket = io();
    dispatch({ type: "SOCKET", payload: socket });
    return () => {
      socket.close();
    };
  }, [dispatch]);

  return (
    <div className="container-fluid" style={{ overflow: "clip" }}>
      <SocketClient />
      <Router>
        <Alert />
        {/* <div className="fixed-top" style={{ width: "100vw" }}></div> */}
        <div
          className="row"
          // style={{ display: "grid", gridTemplateColumns: "23% 54% 23%" }}
        >
          <div className="col-0 col-md-3">
            <Header />
          </div>

          <div className="col-12 col-md-9 px-0">
            <Category />
            <Switch>
              <Route exact path="/" component={PageRender} />
              <Route exact path="/:page" component={PageRender} />
              <Route exact path="/:page/:slug" component={PageRender} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
