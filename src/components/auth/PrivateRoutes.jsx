import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isAuthenticate = useSelector(
    (state) => state.auth.signin.isAuthenticate
  );

  return isAuthenticate ? children : false;
  // <Navigate to="/signin" />;
};

export default PrivateRoutes;
