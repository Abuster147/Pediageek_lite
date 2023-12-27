import React from "react";
import { useSelector } from "react-redux";
import { IBlog, RootStore } from "../../utils/TypeScript";
import DisplayBlog from "../blog/DisplayBlog";
import CardHoriz from "./CardHoriz";
import CardVert from "./CardVert";
interface IProps {
  blog: IBlog;
}

const BlogPreview: React.FC<IProps> = ({ blog }) => {
  const { auth, darkMode } = useSelector((state: RootStore) => state);

  const { isdarkMode } = darkMode;
  console.log(blog);
  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Profile Page Preview
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <CardHoriz blog={blog} />
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Home Page Preview
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body home_blogs">
            {typeof auth.user === "object" && (
              <>
                <CardVert blog={{ ...blog, user: auth.user }} />
                <CardVert blog={{ ...blog, user: auth.user }} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPreview;
