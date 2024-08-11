import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/page/signin.css";
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "../store/slice/authSlice";
import { toast } from "react-toastify";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // handle submit
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (!validation()) {
      return;
    }
    dispatch(userSignin({ email, password }));
    if (user.signin.success) {
      toast.success(user.signin.successMessage);
      navigate("/");
    } else {
      toast.error(user.signin.errorMessage);
    }
  };

  // validate the data at client side
  const validation = () => {
    if (email.trim() === "") {
      toast.warn("Email can't be empty");
      return false;
    }
    if (password.trim() === "") {
      toast.warn("Password can't be empty");
      return false;
    }
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(password)) {
      toast.warn("Password must contain at least one special character");
      return false;
    }
    if (!/\d/.test(password)) {
      toast.warn("Password must contain at least one number");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.warn("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.warn("Password must contain at least one lowercase letter");
      return false;
    }
    return true;
  };

  return (
    <div className="row d-flex justify-content-center ">
      <div className="py-3 signin-header">
        <h3
          onClick={() => {
            navigate("/");
          }}
        >
          <strong>Fashion</strong>
          <strong className="flick">Flick</strong>
        </h3>
      </div>
      <form
        id="show-login"
        name="login_form"
        className="w-100 mt-4"
        onSubmit={handelSubmit}
        style={{ maxWidth: "400px" }}
      >
        <div className="card p-4 shadow-sm">
          <span
            className="position-absolute top-0 end-0 p-2"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-xmark" />
          </span>
          <div className="text-center mb-4">
            <h2>Sign in</h2>
          </div>
          <div className="form-group mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 text-end">
            <p className="mb-0">
              <Link to="#" className="text-primary">
                Forgot Password
              </Link>
            </p>
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Login
          </button>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
