// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null // Initialize with null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;
