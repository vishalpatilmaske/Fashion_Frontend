import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("accessToken"));

  // Check if user is authenticated
  return token ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default PrivateRoutes;
