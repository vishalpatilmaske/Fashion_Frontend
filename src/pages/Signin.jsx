import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/page/signin.css";
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "../store/slice/authSlice";
import { toast } from "react-toastify";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Get the path where the user was trying to go before signing in
  const from = location.state?.from?.pathname || "/";

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userSignin({ email, password }));
  };

  // Monitor authentication status and redirect after success
  useEffect(() => {
    if (auth.signin.isAuthenticate) {
      toast.success(auth.signin.successMessage || "Signed in successfully");
      // Redirect to the previous page or homepage
      navigate(from, { replace: true });
    } else if (auth.signin.errorMessage) {
      toast.error(auth.signin.errorMessage);
    }
  }, [auth.signin.isAuthenticate, auth.signin.errorMessage, navigate, from]);

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
        onSubmit={handleSubmit}
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
