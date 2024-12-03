import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components";

import useAppData from "../util/CustomHooks/useAppData";

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
