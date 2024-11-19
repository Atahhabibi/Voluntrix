import { configureStore } from "@reduxjs/toolkit";
import  userReducer from './src/features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer // Ensure it's properly added
  }
});

export default store;
