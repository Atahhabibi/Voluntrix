// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import navLinkData from "../../util/navLinksData";

const initialState = {
  user: null,
  tasks: [],
  events: [],
  links: navLinkData
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserTasks: (state, action) => {
      state.tasks = action.payload;
    },

    addUserEvents: (state, action) => {
      state.events = action.payload;
    },

    setUserData: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },

    setNavLinksLogout: () => {
      let newLinks = navLinkData.filter(
        (item) =>
          item.path !== "/userDashboard" && item.path !== "/adminDashboard"
      );
      localStorage.setItem("nav-links", JSON.stringify(newLinks));
    }
  },
  setNavLinksLogin: () => {
    localStorage.setItem("nav-links", JSON.stringify(navLinkData));
  }
});

export const {
  setUserData,
  logoutUser,
  addUserEvents,
  addUserTasks,
  setNavLinksLogout,
  setNavLinksLogin
} = userSlice.actions;
export default userSlice.reducer;
