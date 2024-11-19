import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, allowedRoles }) => {
  // Retrieve user data from localStorage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null; // Check if user data exists
  const isAuthenticated = localStorage.getItem("authToken"); // Check if the user is authenticated

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  // If no user data, redirect to login or home
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is allowed to access the page
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />; // Redirect to home page if role is not authorized
  }

  return element; // Render the element if authorized
};

export default PrivateRoute;
