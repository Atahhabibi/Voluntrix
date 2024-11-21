import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/user/userSlice";
import eventsReducer from "./src/features/events/event";
import tasksReducer from "./src/features/task/TaskSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Ensure it's properly added
    events: eventsReducer,
    tasks: tasksReducer
  }
});

export default store;
