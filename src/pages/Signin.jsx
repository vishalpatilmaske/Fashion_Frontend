import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/page/signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert(responseData.message);
        console.log(responseData.message);
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      console.log("Error:", error.message);
      alert("Signin Error: Network Error");
    }
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
        method="POST"
        onSubmit={handleSubmit}
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
