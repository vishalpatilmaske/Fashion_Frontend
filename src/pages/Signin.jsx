import React, { useState, useEffect } from "react";
import shopingImage from "../../public/assets/images/login/shopingbags.png";
import google from "../../public/assets/images/login/google.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/page/signin.css";
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "../store/slice/authSlice";
import { toast } from "react-toastify";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Get the path where the user was trying to go before signing in
  const from = location.state?.from?.pathname || "/";

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(userSignin({ email, password }));
    } else {
      setErrors(validationErrors);
    }
  };

  // Form validation function
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  // Monitor authentication status and redirect after success
  useEffect(() => {
    if (auth.signin.isAuthenticate) {
      // Redirect to the previous page or homepage
      toast.success("User login successfully");
      navigate(from, { replace: true });
    } else if (auth.signin.errorMessage) {
      toast.error(auth.signin.errorMessage);
    }
  }, [auth, navigate, from]);

  return (
    <div
      className="row d-flex justify-content-center align-items-center container-fluid m-0 p-0 "
      style={{ height: "100Vh" }}
    >
      <div className="login-page-container card shadow-sm">
        <div className="login-page-form-container d-flex row">
          <div className="signin-header m-0 p-0 mb-3">
            <h3
              onClick={() => {
                navigate("/");
              }}
              className="py-2 ps-2 text-sm-start"
            >
              <strong className="fashion">Fashion</strong>
              <strong className="flick">Flick</strong>
            </h3>
          </div>
          <div className="login-form mb-4 ">
            <div className="d-flex align-items-start">
              <span
                className="position-absolute top-0 end-0 "
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-xmark" />
              </span>
              <div className="login-greet mb-4 w-100">
                <h2>Welcome back</h2>
                <p>please enter your details</p>
              </div>{" "}
            </div>
            <div>
              <button type="submit" className="btn border btn-sm w-100">
                <img
                  src={google}
                  alt="fashion flick google icon"
                  style={{ width: "1.2rem", marginRight: "0.3rem" }}
                />
                Sign in with Google
              </button>
              <div className="google-or">
                <hr />
                or
                <hr />
              </div>
            </div>
            <form
              id="show-login"
              name="login_form"
              className="w-100 singin-form "
              onSubmit={handleSubmit}
            >
              <div className="">
                <div className="form-group mb-3 text-start">
                  <label htmlFor="email" className="form-label mb-1">
                    Email address
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback text-danger">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group mb-3 text-start">
                  <label htmlFor="password" className="form-label mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-sm ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    name="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback text-danger">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="login-forget-password ">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="rememberMe"
                    />
                    <label class="form-check-label" for="rememberMe">
                      Remember Me
                    </label>
                  </div>
                  <p className="mb-0">
                    <Link to="#" className="text-primary">
                      Forgot Password
                    </Link>
                  </p>
                </div>

                <button type="submit" className="btn btn-warning btn-sm w-100">
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
        </div>
        <div className="login-image-container">
          <img src={shopingImage} alt="fashion flick shoping images" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
