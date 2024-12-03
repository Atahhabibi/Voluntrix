import React, { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { parseJwt } from "../util/dataHandlingFunctions";

const defaultLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Tasks", path: "/tasks" },
  { label: "Events", path: "/events" },
  { label: "Contact", path: "/contact" }
];

const loggedInLinks = {
  volunteer: [
    { label: "Dashboard", path: "/userDashboard" },
    { label: "Tasks", path: "/tasks" },
    { label: "About", path: "/about" },
    { label: "Events", path: "/events" },
    { label: "Contact", path: "/contact" }
  ],
  admin: [
    { label: "Dashboard", path: "/adminDashboard" },
    { label: "Tasks", path: "/tasks" },
    { label: "Events", path: "/events" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" }
  ],
  "super-admin": [
    { label: "Dashboard", path: "/adminDashboard" },
    { label: "Tasks", path: "/tasks" },
    { label: "Events", path: "/events" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" }
  ]
};

const Navbar = () => {
  const [navLinks, setNavLinks] = useState(defaultLinks);

  const token = localStorage.getItem("authToken");
  const decode = parseJwt(token); 
  const role=decode?.role; 

  useEffect(() => {
    if (token && role) {
      setNavLinks(loggedInLinks[role] || defaultLinks);
    } else {
      setNavLinks(defaultLinks);
    }
  }, [token, role]);

  const handleTheme = () => {
    // Theme toggle logic
  };

  const handleLinkClick = () => {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    if (sidebarToggle) sidebarToggle.checked = false;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    setNavLinks(defaultLinks); // Reset links to default
    window.location.href = "/"; // Redirect to Home
  };

  return (
    <div className="drawer drawer-mobile">
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="bg-base-200 navbar align-element">
          <div className="navbar-start">
            <NavLink
              to="/"
              className="hidden lg:flex btn btn-primary text-3xl items-center capitalize"
            >
              V
            </NavLink>
            <label htmlFor="sidebar-toggle" className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
          </div>
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
          <div className="navbar-end">
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={handleTheme} />
              <BsMoonFill className="swap-on h-6 w-6" />
              <BsSunFill className="swap-off h-6 w-6" />
            </label>
            {token ? (
              <button
                onClick={handleLogout}
                className="btn btn-secondary capitalize btn-sm ml-4"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/adminLogin"
                className="btn btn-secondary capitalize btn-sm ml-4"
              >
                I am Admin
              </NavLink>
            )}
          </div>
        </nav>
      </div>

      {/* Sidebar */}
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
