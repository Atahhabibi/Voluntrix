// HomeLayout.js
import React from "react";
import { Outlet, Link } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <hr />
      {/* Outlet is where child routes will be rendered */}
      <Outlet />
    </div>
  );
}

export default HomeLayout;