import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/user/userSlice";
import eventsReducer from "./src/features/events/event";
import tasksReducer from "./src/features/task/TaskSlice";
import adminReducer from "./src/features/admin/admin";

const store = configureStore({
  reducer: {
    user: userReducer, // Ensure it's properly added
    events: eventsReducer,
    tasks: tasksReducer,
    admin:adminReducer
  }
});

export default store;
