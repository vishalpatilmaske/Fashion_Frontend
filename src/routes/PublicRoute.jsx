import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.user.signin.isAuthenticated
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Navigate to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
