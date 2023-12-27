import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserPre } from "../../redux/actions/preferanceAction";
import { ALERT } from "../../redux/types/alertType";
import { getAPI } from "../../utils/FetchData";
import { RootStore } from "../../utils/TypeScript";

const Aibox = () => {
  const { categories, auth, darkMode } = useSelector(
    (state: RootStore) => state
  );
  const { isdarkMode } = darkMode;
  const app = document.getElementById("app");
  const [categor, setCategor] = useState(categories);
  const [catlist, setCatlist] = useState<string[]>([]);
  const [catn, setCatn] = useState<string[]>([]);
  const [catname, setCatname] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setCategor(categories);
    if (auth.access_token) {
      setTimeout(() => {
        if (!auth.user?.preferance) $("#aimodalb").trigger("click");
      }, 5000);
    }
  }, [auth]);

  const handleSubmit = () => {
    if (catlist.length < 5)
      return dispatch({
        type: ALERT,
        payload: { errors: "Chose minimum 5 from list." },
      });
    dispatch(updateUserPre(catn, catlist, auth));
    $("#aimodalb").trigger("click");
    dispatch({ type: ALERT, payload: { success: "Successfully Updated." } });
  };

  const handleChangeCat = (e: any) => {
    const value = e.target.id;
    setCatlist([value, ...catlist]);
    setCatn([e.target.innerText.toLowerCase(), ...catn]);
  };

  function showhide() {
    if (app) app.style.display = "block";
  }
  const removeelm = (index) => {
    setCatlist([
      ...catlist.slice(0, index),
      ...catlist.slice(index + 1, catlist.length),
    ]);
    setCatn([...catn.slice(0, index), ...catn.slice(index + 1, catn.length)]);
  };

  useEffect(() => {
    if (catname.length < 2) {
      setCategor(categories);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      try {
        getAPI(`categoryarray?categor=${catname}`)
          .then((res) => {
            console.log(res.data);
            setCategor(res.data);
          })
          .catch((err) => setCategor([]));
      } catch (err) {
        console.log(err);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [catname, categories]);

  return (
    <>
      <div
        className="modal fade"
        id="aimodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="aimodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="aimodalLabel">
                Set Preferance {catlist.length}/5 selected
              </h5>
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div className="modal-body">
              <div className="form-group my-3">
                <input
                  autoComplete="off"
                  id="inputcat"
                  type="search"
                  className="form-control me-2 w-100"
                  value={catname}
                  placeholder="Add category ..."
                  onFocus={(e) => showhide()}
                  onChange={(e) => setCatname(e.target.value)}
                />

                <div
                  className="container pt-2 px-0 w-100 rounded position-relative example"
                  id="app"
                  style={{
                    marginTop: 2,
                    zIndex: 10,
                    maxHeight: "calc(100vh -250px)",
                    maxWidth: 500,
                    overflow: "auto",
                    paddingBottom: 3,
                    display: "none",
                  }}
                >
                  {categor.length === 0 ? (
                    <h5 className="text-center">No category mathcing</h5>
                  ) : (
                    categor.map((category) => (
                      <>
                        {!catn.includes(category.name) ? (
                          <span
                            className="btn btn-success py-1 m-1"
                            key={category._id}
                            id={category._id}
                            onClick={(e) => {
                              handleChangeCat(e);
                            }}
                            style={{
                              textDecoration: "none",
                              textTransform: "capitalize",
                            }}
                          >
                            {category.name}
                          </span>
                        ) : (
                          <></>
                        )}
                      </>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div
                className={`example pt-1 px-2 mb-1  border border-start-0 border-end-0`}
                style={{
                  position: "relative",
                  display: "block",
                  overflow: "scroll",
                  whiteSpace: "nowrap",
                }}
              >
                {catn.map((category, index) => (
                  <button
                    key={index}
                    className={`btn btn-tag mx-1 px-2 text-${
                      isdarkMode ? "white" : "black"
                    } `}
                    style={{
                      backgroundColor: isdarkMode ? "#373737" : "#e9e3e3",
                    }}
                  >
                    <Link
                      target="_blank"
                      to={`/blogs/${category}`}
                      style={{
                        textDecoration: "none",
                      }}
                      className={`text-${isdarkMode ? "white" : "black"}`}
                    >
                      {category}
                    </Link>{" "}
                    <i
                      className="fas fa-times"
                      onClick={() => removeelm(index)}
                    ></i>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary d-block"
                onClick={handleSubmit}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary d-none"
        id="aimodalb"
        data-bs-toggle="modal"
        data-bs-target="#aimodal"
      ></button>
    </>
  );
};

export default Aibox;
