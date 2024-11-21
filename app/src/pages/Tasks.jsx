import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaFilter,
  FaClock,
  FaUserFriends,
  FaCheck,
  FaTasks
} from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../util/customFetch";
import { Link, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

const TasksPage = () => {

  const tasks=useSelector((store)=>store.tasks.tasks)

  const navigation=useNavigation(); 
  const isLoading=navigation.state==="loading"; 
  const isError=navigation.state==="error"; 


  const [filter, setFilter] = useState({
    date: "",
    type: "",
    minPoints: 0
  });
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Apply filters to tasks and only show tasks for the selected date
  const applyFilters = () => {
    if (!tasks) return;
    const filtered = tasks.filter((task) => {
      return (
        (!filter.date || task.date === filter.date) &&
        (!filter.type || task.type === filter.type) &&
        task.points >= filter.minPoints
      );
    });
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filter, tasks]);

  const handleDateChange = (date) => {
    const selectedDate = date.toISOString().split("T")[0]; // Format to 'yyyy-mm-dd'
    setFilter({ ...filter, date: selectedDate });
  };

  const handleTaskTypeChange = (e) => {
    setFilter({ ...filter, type: e.target.value });
  };

  const handleMinPointsChange = (e) => {
    setFilter({ ...filter, minPoints: Number(e.target.value) });
  };

  const calendarEvents = (filteredTasks || []).map((task) => ({
    title: task.name,
    date: task.date,
    description: ` ${task.time}`,
    extendedProps: { type: task.type, volunteersNeeded: task.volunteersNeeded }
  }));

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Failed to load tasks. Please try again later.</div>;
  }

  if (tasks?.length < 0) {
    return <div>no task available</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-300 flex justify-center items-center gap-2">
            <FaTasks /> Available Volunteer Tasks
          </h1>
          <p className="text-lg mt-4 text-gray-300">
            Browse all tasks that need support and sign up for those that fit
            your interests and schedule.
          </p>
        </section>

        {/* Filter Options */}
        <section className="mb-8 bg-base-300 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex-1">
              <label className="block text-primary mb-2 font-bold flex items-center gap-2">
                <FaCalendarAlt /> Date
              </label>
              <input
                type="date"
                className="input input-bordered w-full bg-base-100"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-primary mb-2 font-bold flex items-center gap-2">
                <FaFilter /> Task Type
              </label>
              <select
                className="select select-bordered w-full bg-base-100"
                value={filter.type}
                onChange={handleTaskTypeChange}
              >
                <option value="">Select Type</option>
                <option value="setup">Setup</option>
                <option value="clean-up">Clean-Up</option>
                <option value="crowd control">Crowd Control</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-primary mb-2 font-bold flex items-center gap-2">
                <FaCheck /> Min Points
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
                placeholder="Min Points"
                value={filter.minPoints}
                onChange={handleMinPointsChange}
              />
            </div>
          </div>
        </section>

        {/* FullCalendar Section */}
        <section className="mb-12 bg-base-300 p-4 rounded-lg shadow-lg hidden sm:block">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            dateClick={(info) => {
              handleDateChange(info.date);
            }}
            eventClick={(info) => alert(info.event.title)}
            eventContent={(eventInfo) => (
              <div className="text-xs text-white ">
                <p>
                  {eventInfo.event.title?.length > 10
                    ? eventInfo.event.title.slice(0, 10)
                    : eventInfo.event.extendedProps.description}
                </p>
                <p>{eventInfo.event.extendedProps.description}</p>
              </div>
            )}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay"
            }}
            contentHeight="auto"
            eventTextColor="#000000" // Ensure text is visible
          />
        </section>

        {/* Task Cards for Selected Date */}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-400" /> Tasks for{" "}
            {filter.date || "Select a date"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="card bg-base-300 shadow-md p-6 border border-gray-600 rounded-lg transition transform hover:shadow-xl "
                style={{ maxHeight: "380px", minHeight: "320px" }} // Fixed max height and consistent min height
              >
                {/* Card Title */}
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2 truncate">
                  <FaTasks className="text-blue-400" /> {task.name}
                </h3>

                {/* Card Content */}
                <div className="text-gray-300 space-y-3">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-400" />
                    <span className="font-medium truncate">
                      Date: {task.date}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-blue-400" />
                    <span className="font-medium truncate">
                      Time: {task.time}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUserFriends className="text-green-400" />
                    <span className="font-medium truncate">
                      Volunteers Needed: {task.volunteersNeeded}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCheck className="text-purple-400" />
                    <span className="font-medium text-purple-300 truncate">
                      Points: {task.points}
                    </span>
                  </p>
                </div>

                {/* Sign Up Button */}
                <Link
                  to={`/tasks/${task._id}`}
                  className="mt-6 w-full bg-primary  text-black font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 hover:bg-gray-300"
                >
                  <FaCheck className="text-whjte" /> Sign Up
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TasksPage;
