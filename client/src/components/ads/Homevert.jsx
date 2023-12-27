import { useEffect } from "react";
import { useSelector } from "react-redux";
import Hometext from "./Hometext";
const Homevert = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      className={`card border-0 position-relative bg-${
        isdarkMode ? "dark" : "light"
      }`}
    >
      {/* <!-- home try --> */}
      {/* <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="4821292000"
        data-ad-format="auto"
        data-full-width-responsive="false"
      ></ins> */}
      {/* <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-6f+bz+1t+6+bq"
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="8896268383"
      ></ins> */}

      <Hometext />
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="fluid"
          data-ad-layout-key="-5m+c7-1o-7g+uv"
          data-ad-client="ca-pub-3982561798373930"
          data-ad-slot="8226799525"
        ></ins>
    </div>
  );
};

export default Homevert;
