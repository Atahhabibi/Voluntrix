// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  tasks: [],
  events: []
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
    }
  }
});

export const { setUserData, logoutUser, addUserEvents, addUserTasks } =
  userSlice.actions;
export default userSlice.reducer;
