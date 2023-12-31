import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOtherInfo } from "../../redux/actions/userAction";

import { RootStore, IUser } from "../../utils/TypeScript";

import Follow from "./Follow";
import Onlytick from "./Onlytick";
interface IProps {
  id: string;
}
const UserInfo: React.FC<IProps> = ({ id }) => {
  const [follower, setFollower] = useState<IUser>();
  const { otherInfo, darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!id) return;
    if (otherInfo.every((user) => user._id !== id)) {
      dispatch(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find((user) => user._id === id);
      if (newUser) setFollower(newUser);
    }
  }, [id, otherInfo, dispatch, history]);
  if (!follower) return <div>Not Found</div>;
  return (
    <div
      className={`container my-2 bg-${
        isdarkMode ? "dark" : "light"
      } py-2 rounded`}
    >
      <div className="d-flex flex-row justify-content-between align-items-center ">
        <Link to={`/profile/${follower._id}`} className="text-decoration-none">
          <div className="d-flex flex-row align-items-center">
            <img
              className="rounded-circle"
              src={follower.avatar}
              width="55"
              height="55"
            />
            <div className="d-flex flex-column align-items-start ml-2">
              <span
                className={`fw-bold mx-2 text-${isdarkMode ? "light" : "dark"}`}
              >
                {follower.name}
                <Onlytick role={follower.role} />
              </span>
              <span
                className={`followers mx-2 text-muted text-${
                  isdarkMode ? "light" : "dark"
                }`}
              >
                {follower.follower.length} Followers
              </span>
            </div>
          </div>
        </Link>
        <div
          className="d-flex flex-row align-items-center"
          style={{ marginTop: -10 }}
        >
          <Follow user={follower} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
