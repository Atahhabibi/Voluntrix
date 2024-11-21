import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    isLoading: false,
    isError: false
  },
  reducers: {
    addEvents: (state, action) => {
      state.events = action.payload;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    isError: (state, action) => {
      state.isError = action.payload;
    }
  }
});

export const {addEvents,isLoading,isError} = eventsSlice.actions;

export default eventsSlice.reducer;
