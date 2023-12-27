import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import NotFound from "../global/NotFound";
import Monetary from "./Monetary";
import Tick from "./Tick";
import Helmetglobal from "../global/Helmetglobal";
import EditInfo from "./EditInfo";

const UserInfo = () => {
  const initState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
    about: "",
    referer: "",
    country: "",
    city: "",
    state: "",
    locality: "",
    gender: "",
  };

  const { auth, darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  if (!auth.user) return <NotFound />;
  return (
    <>
      <div
        className={`profile_info position-relative bg-${
          isdarkMode ? "dark" : "light"
        }`}
      >
        <Helmetglobal
          title={auth.user.name}
          description={auth.user.about}
          keyword="social profile"
        />
        <div className="position-absolute" style={{ right: 3, top: 3 }}>
          <Monetary />
        </div>
        <button
          type="button"
          className={`btn btn-${
            isdarkMode ? "light" : "dark"
          } rounded-circle position-absolute`}
          style={{ left: 3, top: 3 }}
          data-bs-toggle="modal"
          data-bs-target="#profileModal"
        >
          <i
            className={`fas fa-user-edit text-${isdarkMode ? "dark" : "light"}`}
          ></i>
        </button>
        <div className="text-center">
          <div className="info_avatar">
            <img src={auth.user.avatar} alt="avatar" />
          </div>
          <Tick role={auth.user.role} />

          <div className={`mt-1 text-${isdarkMode ? "white" : "black"}`}>
            Name: <span className="text-info">{auth.user.name}</span>
          </div>

          <div className={`text-${isdarkMode ? "white" : "black"}`}>
            Email: <span className={`text-info `}>{auth.user.account}</span>
          </div>
          <div className={`text-${isdarkMode ? "white" : "black"}`}>
            {auth.user.about}
          </div>

          <div className="row mt-3 mb-1" style={{ textAlign: "center" }}>
            <div className="col-6">
              <b className={`text-${isdarkMode ? "white" : "black"}`}>
                Followers
              </b>
              <p className={`text-${isdarkMode ? "white" : "black"}`}>
                {auth.user.follower.length}
              </p>
            </div>
            <div className="col-6">
              <b className={`text-${isdarkMode ? "white" : "black"}`}>
                Following
              </b>
              <p className={`text-${isdarkMode ? "white" : "black"}`}>
                {auth.user.following.length}
              </p>
            </div>
          </div>
          <br />
          <br />
          {auth.user.birthday && (
            <div
              className={`bg-${isdarkMode ? "dark" : "white"} text-${
                isdarkMode ? "white" : "black"
              }`}
              style={{ display: "inline" }}
            >
              Join Date:{" "}
              <span style={{ color: "#ffc107" }}>
                {new Date(auth.user.createdAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
      <EditInfo />
    </>
  );
};

export default UserInfo;
