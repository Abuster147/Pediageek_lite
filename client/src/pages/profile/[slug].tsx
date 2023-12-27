import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IParams, RootStore } from "../../utils/TypeScript";

import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";
import Other from "../../components/profile/Other";
import Info from "../../components/profile/Info";

const Profile = () => {
  const { slug }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <div className="home_page my-2 row justify-content-evenly position-relative">
      <div
        style={{ maxWidth: "622px" }}
        className="col-12 col-lg-7 px-0 order-2 order-md-1 my-2"
      >
        {auth.user?._id === slug ? <Info /> : <Other id={slug} />}
      </div>
      <div
        className="col-12 col-lg-4 order-1 order-md-2 my-2"
        style={{ maxHeight: "100vh" }}
      >
        {auth.user?._id === slug ? <UserInfo /> : <OtherInfo id={slug} />}
      </div>
    </div>
  );
};

export default Profile;
