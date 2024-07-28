import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/page/signup.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/slice/userSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    if (conPassword.trim() === "") {
      toast.warn("Confirm Password can't be empty");
      return false;
    }
    if (password !== conPassword) {
      toast.warn("Passwords do not match");
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

  // handel the submit data
  const handleSubmitData = async (event) => {
    event.preventDefault();
    if (!validation()) {
      return;
    }
    dispatch(signupUser({ email, password }));
    if (!user.loading) {
      if (user.successMessage) {
        toast.success(user.successMessage);
        navigate("/signin");
      }
      if (user.errorMessage) {
        toast.error(user.errorMessage);
      }
    }
  };

  return (
    <div className="row d-flex justify-content-center ">
      <div className="py-3 signup-header">
        <h3
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <strong>Fashion</strong>
          <strong className="flick">Flick</strong>
        </h3>
      </div>
      <form
        name="signup_form"
        onSubmit={handleSubmitData}
        method="post"
        className="w-100 mt-4"
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
            <h2>Sign up</h2>
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              autoComplete="new-password"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Create Password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              name="confirm-password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              onChange={(e) => setConPassword(e.target.value)}
            />
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
