import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components";
import { addTasks } from "../features/task/TaskSlice";
import { addEvents } from "../features/events/event";
import { setAdmin, setAuth } from "../features/admin/admin";
import useAppData from "../util/CustomHooks/useAppData";
import { useDispatch } from "react-redux";

function HomeLayout() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useAppData();

  useEffect(() => {
    if (data) {
      const tasks = data?.tasks?.data || [];
      const events = data?.events?.data || [];
      const admin = data?.admin?.admin || null; // Default to null if no admin data

      // Dispatch actions for tasks and events
      dispatch(addTasks(tasks));
      dispatch(addEvents(events));

      // Validate and set admin data only if admin object has valid data
      if (admin && admin.role) {
        dispatch(setAuth({ isAuthenticated: true, role: admin.role }));
        dispatch(setAdmin(admin));
      } else {
        // Clear admin state if no valid admin data
        dispatch(setAuth({ isAuthenticated: false, role: null }));
        dispatch(setAdmin(null));
      }
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div className="text-center text-white">Loading events...</div>;
  }

  if (isError) {
    return <div className="text-center text-white">Error fetching data...</div>;
  }

  return (
    <div>
      <Header />
      <Navbar />
      <hr />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
