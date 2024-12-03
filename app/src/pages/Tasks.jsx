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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAppData from "../util/CustomHooks/useAppData";

const TasksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {data,isLoading,isError}=useAppData(); 

  const tasks = data?.tasks?.data || [];


  const [filter, setFilter] = useState({
    date: "",
    type: "",
    minPoints: 0
  });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Apply filters to tasks
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

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const calendarEvents = (filteredTasks || []).map((task) => ({
    title: task.name,
    date: task.date,
    description: ` ${task.time}`,
    extendedProps: { type: task.type, volunteersNeeded: task.volunteersNeeded }
  }));

  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  if (isLoading) {
    return <div className="text-center text-white">Loading events...</div>;
  }

  if (isError) {
    return <div className="text-center text-white">Error fetching data...</div>;
  }





  return (
    <div className="min-h-screen bg-gray-900 text-base-content p-6 md:p-12 flex justify-center">
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
        <section className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex-1">
              <label className=" text-white mb-2 font-bold flex items-center gap-2">
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
              <label className="text-white mb-2 font-bold flex items-center gap-2">
                <FaFilter /> Task Type
              </label>
              <select
                className="select select-bordered w-full bg-base-100"
                value={filter.type}
                onChange={(e) =>
                  setFilter({ ...filter, type: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="setup">Setup</option>
                <option value="clean-up">Clean-Up</option>
                <option value="crowd control">Crowd Control</option>
              </select>
            </div>
            <div className="flex-1">
              <label className=" text-white mb-2 font-bold flex items-center gap-2">
                <FaCheck /> Min Points
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
                placeholder="Min Points"
                value={filter.minPoints}
                onChange={(e) =>
                  setFilter({ ...filter, minPoints: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </section>

        {/* FullCalendar Section */}
        <section className="mb-12 bg-gray-800 p-4 rounded-lg shadow-lg hidden sm:block">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            dateClick={(info) => {
              setFilter({ ...filter, date: info.dateStr });
            }}
            eventContent={(eventInfo) => (
              <div className="text-xs text-white ">
                <p>
                  {eventInfo.event.title?.length > 10
                    ? eventInfo.event.title.slice(0, 10)
                    : eventInfo.event.extendedProps.description}
                </p>
              </div>
            )}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay"
            }}
            contentHeight="auto"
          />
        </section>

        {/* Task Cards for Selected Date */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-400" /> Tasks for{" "}
            {filter.date || "Select a date"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTasks.map((task) => (
              <div
                key={task._id}
                className="card bg-gray-800 shadow-md p-6 border border-gray-600 rounded-lg transition transform hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold text-gray-100 mb-4">
                  {task.name}
                </h3>
                <p className="text-gray-300">
                  <FaCalendarAlt className="inline-block text-yellow-400 mr-2" />
                  Date: {task.date}
                </p>
                <p className="text-gray-300">
                  <FaClock className="inline-block text-blue-400 mr-2" />
                  Time: {task.time}
                </p>
                <p className="text-gray-300">
                  <FaUserFriends className="inline-block text-green-400 mr-2" />
                  Volunteers Needed: {task.volunteersNeeded}
                </p>
                <p className="text-gray-300">
                  <FaCheck className="inline-block text-purple-400 mr-2" />
                  Points: {task.points}
                </p>
                <Link
                  to={`/tasks/${task._id}`}
                  className="px-4 py-2 flex items-center justify-center gap-2 text-lg font-semibold text-black bg-green-300 hover:bg-green-600 rounded-lg shadow-md hover:shadow-lg transition duration-300 capitalize mt-6"
                >
                  Sign Up
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
