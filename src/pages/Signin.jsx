import React, { useState, useEffect } from "react";
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
    <div className="row d-flex justify-content-center container-fluid m-0 p-0 ">
      <div className="signin-header m-0 p-0">
        <h3
          onClick={() => {
            navigate("/");
          }}
          className="ps-sm-5 ps-4 bg-dark py-2"
        >
          <strong className="fashion">Fashion</strong>
          <strong className="flick">Flick</strong>
        </h3>
      </div>
      <form
        id="show-login"
        name="login_form"
        className="w-100 mt-4 singin-form"
        onSubmit={handleSubmit}
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
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback text-danger">{errors.email}</div>
            )}
          </div>
          <div className="form-group mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
