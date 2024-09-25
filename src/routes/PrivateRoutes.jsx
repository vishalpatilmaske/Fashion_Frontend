import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { loadLocalStorage } from "../store/slice/authSlice";

const PrivateRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.auth.signin.isAuthenticate
  );
  const location = useLocation();
  // Run the dispatch to load local storage once when the component mounts
  useEffect(() => {
    dispatch(loadLocalStorage());
  }, [dispatch]);
  // Check if user is authenticated
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default PrivateRoutes;
