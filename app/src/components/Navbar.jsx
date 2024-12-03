import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateNavLinks } from "../features/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { navLinks } = useSelector((state) => state.user); // Get links from Redux store

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    dispatch(updateNavLinks(token)); // Dynamically update links based on token
  }, [dispatch]);

  return (
    <nav className="navbar bg-base-200">
      <div className="flex justify-center w-full">
        <ul className="menu menu-horizontal">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
