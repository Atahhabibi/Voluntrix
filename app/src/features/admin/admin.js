import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminAuth: {
    isAuthenticated: false,
    role: null
  },
  admin: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.adminAuth.isAuthenticated = action.payload.isAuthenticated;
      state.adminAuth.role = action.payload.role;
    },
    clearAuth: (state) => {
      state.adminAuth.isAuthenticated = false;
      state.adminAuth.role = null;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    }
  }
});

export const { setAuth, clearAuth, setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
