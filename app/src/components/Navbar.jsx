import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateNavLinks } from "../features/user/userSlice";
import { parseJwt } from "../util/dataHandlingFunctions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { navLinks } = useSelector((state) => state.user); // Get links from Redux store

  const token=localStorage.getItem('authToken'); 
  const decode=parseJwt(token); 
  const role=decode?.role; 
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    dispatch(updateNavLinks(token)); // Dynamically update links based on token
  }, [dispatch]);


  const handleLinkClick = () => {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    if (sidebarToggle) sidebarToggle.checked = false;
  };

  return (
    <div className="drawer drawer-mobile">
      {/* Sidebar Toggle */}
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="bg-base-100 navbar align-element w-full mx-auto max-w-[1220px]">
          <div className="navbar-start">
            {/* Brand Logo */}

            {(role === "super-admin" || role === "admin") && (
              <NavLink
                to="/adminDashboard"
                className="hidden lg:flex btn btn-primary text-3xl items-center capitalize"
              >
                V
              </NavLink>
            )}

            {role === "volunteer" && (
              <NavLink
                to="/userDashboard"
                className="hidden lg:flex btn btn-primary text-3xl items-center capitalize"
              >
                V
              </NavLink>
            )}

            {!role && (
              <NavLink
                to="/"
                className="hidden lg:flex btn btn-primary text-3xl items-center capitalize"
              >
                V
              </NavLink>
            )}

            {/* Sidebar Toggle Button for Mobile */}
            <label htmlFor="sidebar-toggle" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
          </div>

          {/* Center Navbar Links for Larger Screens */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.path} onClick={handleLinkClick}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Navbar Items */}
          <div className="navbar-end">
            <div className="indicator ml-4">
              {role === "admin" || role==='super-admin' && (
                <NavLink
                  to="/register"
                  className="btn btn-secondary capitalize btn-sm"
                >
                  want to be volunteer
                </NavLink>
              )}

              {role === "volunteer" && (
                <NavLink
                  to="/adminLogin"
                  className="btn btn-secondary capitalize btn-sm"
                >
                  I am admin too
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar Menu */}
      <div className="drawer-side">
        <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-200 text-base-content">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path} onClick={handleLinkClick}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
