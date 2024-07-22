import React from "react";
import Signin from "./Signin.jsx";

const Login = () => {
  return (
    <>
      {" "}
      <h3
        onClick={() => {
          navigate("/");
        }}
      >
        <strong>Fashion</strong>
        <strong className="navbarbrand">Flick</strong>
      </h3>
      <Signin />
    </>
  );
};

export default Login;
