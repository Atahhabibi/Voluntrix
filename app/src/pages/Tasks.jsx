import React, { useState, useMemo, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUserFriends,
  FaCheck,
  FaTasks
} from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageError, PageLoading } from "../components";
import {
  fetchEventsTasksForAll,
  getToken,
  formatDate
} from "../util/dataHandlingFunctions";

const TasksPage = () => {
  const token = getToken();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["taskEventForAll"],
    queryFn: fetchEventsTasksForAll,
  });

  const tasks = data?.data?.tasks || [];

  const [filter, setFilter] = useState({
    name: "",
    date: "",
    minPoints: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // UseMemo to filter tasks
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks.filter((task) => {
      return (
        (!filter.name ||
          task.name.toLowerCase().includes(filter.name.toLowerCase())) &&
        (!filter.date || task.date === filter.date) &&
        (!filter.minPoints || task.points >= filter.minPoints)
      );
    });
  }, [tasks, filter]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const currentTasks = useMemo(() => {
    return filteredTasks.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredTasks, currentPage, itemsPerPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const calendarEvents = filteredTasks.map((task) => ({
    title: task.name,
    date: task.date,
    description: `${task.time}`,
    extendedProps: { type: task.type, volunteersNeeded: task.volunteersNeeded },
  }));

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return <PageError />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-base-content p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
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

        {/* Filter Section */}
        <section className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row w-full gap-4 items-end">
            <div className="flex-1">
              <label className="text-white mb-2 font-bold flex items-center gap-2">
                <FaTasks /> Task Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-100"
                placeholder="Search by task name"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="text-white mb-2 font-bold flex items-center gap-2">
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
            <button
              onClick={() => setFilter({ name: "", date: "", minPoints: 0 })}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
            >
              Clear Filters
            </button>
          </div>
        </section>

        {/* Task List */}
        <section className="mb-12 min-h-[760px]">
          <h2 className="text-3xl font-semibold text-gray-200 flex items-center gap-2 justify-center my-6 mb-8">
            <FaCalendarAlt className="text-yellow-400" /> Tasks for{" "}
            {filter.date || "All Dates"}
          </h2>
          {currentTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTasks.map((task) => (
                <div
                  key={task._id}
                  className="card bg-gray-800 shadow-md p-6 border border-gray-600 rounded-lg flex flex-col h-[320px]"
                >
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">
                    {task.name}
                  </h3>
                  <p className="text-gray-300">
                    <FaCalendarAlt className="inline-block text-yellow-400 mr-2" />
                    Date: {formatDate(task.date)}
                  </p>
                  <p className="text-gray-300">
                    <FaClock className="inline-block text-blue-400 mr-2" />
                    Time: {task.time}
                  </p>
                  <p className="text-gray-300">
                    <FaUserFriends className="inline-block text-green-400 mr-2" />
                    Volunteers Needed: {task.volunteersNeeded}
                  </p>
                  <p className="text-gray-300 mb-6">
                    <FaCheck className="inline-block text-purple-400 mr-2" />
                    Points: {task.points}
                  </p>
                  <div className="mt-auto">
                    {token ? (
                      <Link
                        to={`/tasks/${task._id}`}
                        className="px-4 py-2 flex items-center justify-center gap-2 text-lg font-semibold text-black bg-green-300 hover:bg-green-600 rounded-lg shadow-md hover:shadow-lg transition duration-300 capitalize"
                      >
                        Sign Up
                      </Link>
                    ) : (
                      <Link
                        to={`/login`}
                        className="px-4 py-2 flex items-center justify-center gap-2 text-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-md hover:shadow-lg transition duration-300 capitalize"
                      >
                        Please log in to sign up
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>
                No tasks available for the selected filters. Try adjusting your
                filters or check back later.
              </p>
            </div>
          )}
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
