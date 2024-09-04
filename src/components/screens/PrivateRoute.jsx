// import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ element }) {
  const location = useLocation();
  const user_data = JSON.parse(localStorage.getItem("user_data"));

  return user_data ? (
    element
  ) : (
    <Navigate
      to={{
        pathname: "/auth/login",
        from: location,
        search: `?next=${location.pathname}`,
      }}
    />
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
