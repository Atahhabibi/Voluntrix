import React from "react";
import { Navigate } from "react-router-dom";
import { parseJwt } from "../util/dataHandlingFunctions";

const PrivateRoute = ({ element, allowedRoles }) => {

  const token = localStorage.getItem("authToken");
  const decode = parseJwt(token);

  if (!decode) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  // Check if the user's role is allowed to access the page
  if (allowedRoles && !allowedRoles.includes(decode?.role)) {
    return <Navigate to="/" replace />; // Redirect to home page if role is not authorized
  }

  return element; // Render the element if authorized
};

export default PrivateRoute;
