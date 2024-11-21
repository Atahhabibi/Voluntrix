// HomeLayout.js
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Header, Navbar } from "../components";
import store from "../../store";
import { customFetch } from "../util/customFetch";
import { addTasks } from "../features/task/TaskSlice";
import { addEvents } from "../features/events/event";

export const loader = async () => {
  try {
    const response = await customFetch("/tasks");
    const response1 = await customFetch("/events");
    store.dispatch(addTasks(response.data.tasks));
    store.dispatch(addEvents(response1.data.events));

    return { tasks: response.data.tasks, events: response1.data.events };
  } catch (error) {
    console.error(error);
    throw new Response("Failed to fetch data", { status: 500 });
  }
};



function HomeLayout() {
  return (
    <div>
      <Header/>
      <Navbar/>
      <hr /> 
      <Outlet />
    </div>
  );
}

export default HomeLayout;
