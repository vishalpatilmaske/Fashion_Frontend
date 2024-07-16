import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/page/signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const navigate = useNavigate();

  const validation = () => {
    if (email.trim() === "") {
      alert("Email can't be empty");
      return false;
    }
    if (password.trim() === "") {
      alert("Password can't be empty");
      return false;
    }
    if (conPassword.trim() === "") {
      alert("Confirm Password can't be empty");
      return false;
    }
    if (password !== conPassword) {
      alert("Passwords do not match");
      return false;
    }
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(password)) {
      alert("Password must contain at least one special character");
      return false;
    }
    if (!/\d/.test(password)) {
      alert("Password must contain at least one number");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter");
      return false;
    }
    return true;
  };

  const submitData = async (event) => {
    event.preventDefault();
    if (!validation()) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert(responseData.message);
      } else {
        console.error("Error:", response.statusText);
        alert(responseData.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
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
        onSubmit={submitData}
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Create Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              name="confirm-password"
              placeholder="Confirm Password"
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
