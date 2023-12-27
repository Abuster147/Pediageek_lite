import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../utils/FetchData";
import { createCategory } from "../../redux/actions/categoryAction";
import { RootStore, IBlog, InputChange } from "../../utils/TypeScript";
import { Collection } from "mongoose";
import CardHoriz from "./CardHoriz";
interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const dispatch = useDispatch();
  const { categories, auth, darkMode } = useSelector(
    (state: RootStore) => state
  );
  const { isdarkMode } = darkMode;
  const app = document.getElementById("app");
  const types = ["image/png", "image/jpeg", "image/WebP"];
  const [categor, setCategor] = useState(categories);
  const [catname, setCatname] = useState("");

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeCat = (e: any) => {
    const value = e.target.id;
    setBlog({ ...blog, category: value });
    if (app) app.style.display = "none";
    setCatname(e.target.innerText);
    const a = document.getElementById("inputcat") as HTMLInputElement;
    if (a) a.value = e.target.innerText;
  };

  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      if (!types.includes(files[0].type)) {
        e.target.value = "";
        return dispatch({
          type: "ALERT",
          payload: { errors: "Image can only of .JPG or .PNG extension." },
        });
      }
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };

  function showhide() {
    if (app) app.style.display = "block";
  }
  function close() {
    if (app) app.style.display = "none";
  }

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await getAPI(`categoryarray?categor=${catname}`);
        setCategor(res.data);
      } catch (err) {
        console.log(err);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [catname, categories]);

  const addcat = () => {
    if (app) app.style.display = "none";
    if (auth.access_token) dispatch(createCategory(catname, auth.access_token));
  };

  return (
    <div className="container px-0 my-3" style={{ maxWidth: "750px" }}>
      <div
        className="container px-0 bg-light position-relative"
        style={{
          height: "40vh",
          //   backgroundImage: "",
          borderRadius: 10,
          // backgroundSize: "cover",

          //   backgroundRepeat: "no-repeat",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <i
          className="fas fa-image fa-lg p-3 border border-2 border-dark rounded-circle bg-light position-absolute"
          onClick={() => document.getElementById("thumbnail")?.click()}
          style={{ marginTop: "15vh", marginLeft: "-5%", cursor: "pointer" }}
        ></i>
        {blog.thumbnail && (
          <>
            {typeof blog.thumbnail === "string" ? (
              <img
                src={blog.thumbnail}
                className="w-100 h-100"
                alt="thumbnail"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={URL.createObjectURL(blog.thumbnail)}
                className="w-100 h-100"
                alt="thumbnail"
                style={{ objectFit: "cover" }}
              />
            )}
          </>
        )}
        <input
          type="file"
          className="form-control d-none"
          accept="image/*"
          onChange={handleChangeThumbnail}
          id="thumbnail"
        />
      </div>

      <div className="form-group position-relative my-3">
        <input
          type="text"
          className="form-control"
          value={blog.title}
          name="title"
          onChange={handleChangeInput}
          placeholder="Title..."
          style={{
            border: "none",
            borderBottom: `2px solid ${isdarkMode ? "white" : "black"}`,
            padding: "15px 10px",
            outline: "none",
            background: "transparent",
            color: isdarkMode ? "white" : "black",
            fontSize: "25px",
            fontWeight: 500,
          }}
        />

        <small
          className={`position-absolute text-${isdarkMode ? "white" : "black"}`}
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.title.length}/50
        </small>
      </div>
      <div className="form-group position-relative mt-5 my-3">
        <textarea
          className="form-control py-3"
          rows={2}
          value={blog.description}
          name="description"
          onChange={handleChangeInput}
          placeholder="Description..."
          style={{
            border: "none",
            borderBottom: `2px solid ${isdarkMode ? "white" : "black"}`,
            color: isdarkMode ? "white" : "black",
            padding: "15px 10px",
            outline: "none",
            background: "transparent",

            resize: "none",
          }}
        />

        <small
          className={`position-absolute text-${isdarkMode ? "white" : "black"}`}
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.description.length}/200
        </small>
      </div>
      <div className="form-group my-3">
        <input
          autoComplete="off"
          id="inputcat"
          type="text"
          defaultValue={
            blog.category && typeof blog.category == "object"
              ? blog.category.name
              : ""
          }
          className="form-control me-2 w-100"
          placeholder="Add category ..."
          onFocus={(e) => showhide()}
          onChange={(e) => setCatname(e.target.value)}
          style={{
            border: "none",
            borderBottom: `2px solid ${isdarkMode ? "white" : "black"}`,
            color: isdarkMode ? "white" : "black",
            padding: "15px 10px",
            outline: "none",
            background: "transparent",
            resize: "none",
          }}
        />
        <div
          className="container pt-2 px-1 w-100 rounded position-relative"
          id="app"
          style={{
            marginTop: 2,
            background: "#cbcaca",
            zIndex: 10,
            maxHeight: "calc(100vh - 100px)",
            maxWidth: "750px",
            overflow: "auto",
            paddingBottom: 3,
            display: "none",
          }}
        >
          <span
            className="btn btn-secondary p-1 position-absolute px-3"
            style={{ right: 5 }}
            onClick={(e) => {
              close();
            }}
          >
            &times;
          </span>

          {categor.length ? (
            <p style={{ color: "black" }}>Select One...</p>
          ) : (
            <></>
          )}
          {categor.length === 0 ? (
            <button
              className="btn btn-light py-2 m-1 pb-2"
              onClick={(e) => addcat()}
            >
              Add Category
            </button>
          ) : (
            categor.map((category) => (
              <span
                className="btn btn-success py-1 m-1"
                key={category._id}
                id={category._id}
                onClick={(e) => {
                  handleChangeCat(e);
                }}
              >
                {category.name}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
