import { createSlice } from "@reduxjs/toolkit";
import { parseJwt } from "../../util/dataHandlingFunctions";

const initialState = {
  navLinks: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Tasks", path: "/tasks" },
    { label: "Events", path: "/events" },
    { label: "Contact", path: "/contact" }
  ]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateNavLinks: (state, action) => {
      const token = action.payload;
      if (token) {
        const role = parseJwt(token).role;
        if (role === "volunteer") {
          state.navLinks = [
            { label: "Dashboard", path: "/userDashboard" },
            { label: "Tasks", path: "/tasks" },
            { label: "Events", path: "/events" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" }
          ];
        } else if (role === "admin" || role === "super-admin") {
          state.navLinks = [
            { label: "Dashboard", path: "/adminDashboard" },
            { label: "Tasks", path: "/tasks" },
            { label: "Events", path: "/events" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" }
          ];
        }
      } else {
        state.navLinks = [
          { label: "Home", path: "/" },
          { label: "About", path: "/about" },
          { label: "Tasks", path: "/tasks" },
          { label: "Events", path: "/events" },
          { label: "Contact", path: "/contact" }
        ];
      }
    },
    logoutUser: (state) => {
      state.navLinks = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Tasks", path: "/tasks" },
        { label: "Events", path: "/events" },
        { label: "Contact", path: "/contact" }
      ];
    }
  }
});

export const { updateNavLinks, setNavLinksLogout, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;
