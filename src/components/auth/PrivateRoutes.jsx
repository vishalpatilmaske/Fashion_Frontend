import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isAuthenticate = useSelector(
    (state) => state.user.signin.isAuthenticate
  );

  return isAuthenticate ? children : <Navigate to="/signin" />;
};

export default PrivateRoutes;
