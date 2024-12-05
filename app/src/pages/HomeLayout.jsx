import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components";


function HomeLayout() {
  return (
    <div>
      <Header />
      <Navbar />
      <hr />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
