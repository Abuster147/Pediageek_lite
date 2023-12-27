import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputChange, FormSubmit, RootStore } from "../../utils/TypeScript";
import { login } from "../../redux/actions/authAction";

const LoginPass = () => {
  const initialState = { account: "", password: "" };
  const { darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  const [userLogin, setUserLogin] = useState(initialState);
  const { account, password } = userLogin;

  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(login(userLogin));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`text-${isdarkMode ? "light" : "dark"}`}
        style={{ textAlign: "center" }}
      >
        <h4 className='mt-2'>- - - OR - - -</h4>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email
        </label>

        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>

        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />

          <small
            onClick={() => setTypePass(!typePass)}
            style={{ color: "black" }}
          >
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button
        type="submit"
        className={`btn btn-dark w-100 my-1 border border-${
          isdarkMode ? "light" : "dark"
        }`}
        disabled={account && password ? false : true}
      >
        Login
      </button>
    </form>
  );
};

export default LoginPass;
