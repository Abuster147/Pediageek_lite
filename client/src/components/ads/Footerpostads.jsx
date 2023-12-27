import { useEffect } from "react";
import { useSelector } from "react-redux";
import Adsfooter from "./Footerads";
const Adsfoot = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;

  return (
    <div className={`home_blogs`}>
      <Adsfooter />
      <Adsfooter />
      <Adsfooter />
      <Adsfooter />
    </div>
  );
};

export default Adsfoot;
