import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isLoading: false,
    isError: false
  },
  reducers: {
    addTasks: (state, action) => {
      console.log(action.payload);
      state.tasks = action.payload;
    },
    isLoading:(state,action)=>{
        state.isLoading=action.payload; 
    },
    isError:(state,action)=>{
        state.isError=action.payload; 
    },

  }
});

export const { addTasks, isLoading, isError } = taskSlice.actions;

export default taskSlice.reducer;
