import { useEffect } from "react";
import { useSelector } from "react-redux";

const Abovepost = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    // <!-- sidebard -->
    <ins
      class="adsbygoogle mb-1"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3982561798373930"
      data-ad-slot="5989159165"
      data-ad-format="auto"
      data-full-width-responsive="false"
    ></ins>
  );
};

export default Abovepost;
