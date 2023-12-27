import { useEffect } from "react";
import { useSelector } from "react-redux";

const Abovepost = () => {
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
      <ins
        className="adsbygoogle mt-2"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-6g+dr+1a-5p+dx"
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="8226799525"
      ></ins>
    </div>
  );
};

export default Abovepost;
