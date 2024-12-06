import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { parseJwt } from "../util/dataHandlingFunctions";

const PrivateRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // If token is missing, redirect to home and notify the user
    toast.error("Unauthorized access. Please log in.");
    return <Navigate to="/" replace />;
  }

  const decode = parseJwt(token);

  if (!decode) {
    // If token is invalid, remove it and redirect to home with a message
    localStorage.removeItem("authToken");
    toast.error("Invalid token. Logging out.");
    return <Navigate to="/" replace />;
  }

  // Check if the user's role is allowed to access the page
  if (allowedRoles && !allowedRoles.includes(decode?.role)) {
    // Remove token and redirect with an unauthorized message
    localStorage.removeItem("authToken");
    toast.error("Unauthorized access. Logging out.");
    return <Navigate to="/" replace />;
  }

  return element; // Render the element if authorized
};

export default PrivateRoute;
