import React from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { parseJwt } from "../util/dataHandlingFunctions";
import navLinkData from "../util/navLinksData";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  const decode = parseJwt(token);
  const role = decode?.role;

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLinkClick = () => {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    if (sidebarToggle) sidebarToggle.checked = false;
  };

  return (
    <div className="drawer drawer-mobile">
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
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
              {navLinkData
                .filter((link) => !link.roles || link.roles.includes(role))
                .map((link, index) => (
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
            <div className="indicator ml-4">
              <NavLink
                to="/adminLogin"
                className="btn btn-secondary capitalize btn-sm"
              >
                I am Admin
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      <div className="drawer-side">
        <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-200 text-base-content">
          {navLinkData
            .filter((link) => !link.roles || link.roles.includes(role))
            .map((link, index) => (
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
