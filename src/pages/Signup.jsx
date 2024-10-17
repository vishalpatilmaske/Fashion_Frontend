import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/page/signup.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../store/slice/authSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Email validation
    if (!email) {
      isValid = false;
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      formErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      isValid = false;
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      isValid = false;
      formErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!conPassword) {
      isValid = false;
      formErrors.conPassword = "Confirm password is required";
    } else if (password !== conPassword) {
      isValid = false;
      formErrors.conPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle the submit data
  const handleSubmitData = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      dispatch(userSignup({ email, password }));
    }

    // Handle response from auth state
    if (auth.signup.success) {
      toast.success(auth.signup.successMessage);
      navigate("/signin");
    }
    if (auth.signup.errorMessage) {
      toast.error(auth.signup.errorMessage);
    }
  };

  return (
    <div className="row d-flex justify-content-center mx-auto container-fluid m-0 p-0">
      <div className="signup-header m-0 p-0">
        <h3
          onClick={() => {
            navigate("/");
          }}
          className="ps-sm-5 ps-4 bg-dark py-2"
          style={{ cursor: "pointer" }}
        >
          <strong className="fashion">Fashion</strong>
          <strong className="flick">Flick</strong>
        </h3>
      </div>
      <form
        name="signup_form"
        onSubmit={handleSubmitData}
        method="post"
        className="w-100 mt-4 signup-form"
      >
        <div className="card p-4 shadow-sm">
          <span
            className="position-absolute top-0 end-0 p-2"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-xmark" />
          </span>
          <div className="text-center mb-4">
            <h2>Sign up</h2>
          </div>

          {/* Email Field */}
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              autoComplete="new-password"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Create Password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              name="confirm-password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              onChange={(e) => setConPassword(e.target.value)}
            />
            {errors.conPassword && (
              <small className="text-danger">{errors.conPassword}</small>
            )}
          </div>

          <button type="submit" className="btn btn-warning btn-block">
            Sign up
          </button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
