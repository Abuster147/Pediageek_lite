import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/actions/notificationAction";
import { INotification, RootStore } from "../../utils/TypeScript";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Pagination from "../global/Pagination";
import { Link, useHistory } from "react-router-dom";
import "../../styles/notification.css"
TimeAgo.addLocale(en);

const Notification = () => {
    const timeAgo = new TimeAgo("en-US");
    const { auth, notification,darkMode } = useSelector((state: RootStore) => state);
    const [msg, setMsg] = useState<INotification[]>();
    const {isdarkMode}=darkMode;
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        if (auth.access_token) {
            dispatch(getNotifications(auth));
        }
    }, [dispatch, history, auth]);

    useEffect(() => {
        document.getElementById("closebtn")?.click();
    }, [history.location.pathname]);

    useEffect(() => {
        setMsg(notification.data)
    }, [notification]);
    return (
        <>
            <div
                    className={`offcanvas offcanvas-start bg-${isdarkMode?'dark':'light'} text-${isdarkMode?'white':'black'} notification`}
                    data-bs-scroll="true"
                    tabIndex={-1}
                    id="offcanvasWithBothOptions"
                    aria-labelledby="offcanvasWithBothOptionsLabel"
                    
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title"
                        id="offcanvasWithBothOptionsLabel"
                      >
                        Notifications
                      </h5>
                      <button
                        type="button"
                        className={`btn-close  btn-close-${isdarkMode?'white':'black'} text-reset`}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <hr />
                    <div className="offcanvas-body">
                      {msg?.length === 0 ? (
                        <div className="text-center">
                          <div>
                            <i className="fas fa-bell fa-4x"></i>
                          </div>
                          <h5>No Notifications</h5>
                        </div>
                      ) : (
                        <div className="list-group">
                          {msg?.map((data, index) => (
                            <Link
                              key={index}
                              to={data.url ? data.url : "#"}
                              className="list-group-item list-group-item-action list-group-item-info mb-1"
                              aria-current="true"
                              style={{backgroundColor:'whitesmoke'}}
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{data.msg}</h5>
                                <small>
                                  {timeAgo.format(new Date(data.createdAt))}
                                </small>
                              </div>
                              <p className="mb-1">{data.desc}</p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
        </>
    );
};

export default Notification;
