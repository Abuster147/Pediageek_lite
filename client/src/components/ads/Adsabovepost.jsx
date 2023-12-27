import { useEffect } from "react";
import { useSelector } from "react-redux";

const Abovepost = ({ imageurl, imagealt }) => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  

  return (
    <div
      className="position-relative"
      title={imagealt}
      style={{
        backgroundImage: `url(${imageurl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        height: "40vh",
        width:'100%',
        paddingTop:'66.67%'
      }}
    >

      <a href={imageurl} target="_blank"
      style={{
        position:'absolute',
        top:'0px',
        bottom:'0px',
        right:'0px',
        left:'0px',
        textAlign:'center'
      }}
      >
        <span
          className="badge rounded-pill bg-primary position-absolute"
          style={{ bottom: "3%", right: "2%", zIndex: 8, cursor: "pointer" }}
          id="clse"
        >
          View image <i className="fas fa-link"></i>
        </span>
      </a>
     
    </div>
  );
};

export default Abovepost;
