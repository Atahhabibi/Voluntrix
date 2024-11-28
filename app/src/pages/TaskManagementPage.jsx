import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaStar,
  FaArrowLeft,
  FaTasks
} from "react-icons/fa";
import TaskCreationForm from "../components/TaskCreationForm";
import { customFetch } from "../util/customFetch";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TaskManagementPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await customFetch("/tasks");
      return response;
    }
  });

  const tasks = data?.data?.tasks || [];

  const deleteMutation = useMutation({
    mutationFn: async (taskId) => {
      const response = await customFetch.delete(`/tasks/${taskId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setTaskToDelete(null);
      toast.success("Task deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting task");
    }
  });

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    date: "",
    points: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered tasks based on filters
  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.type ? task.type === filters.type : true) &&
      (filters.date ? task.date === filters.date : true) &&
      (filters.points ? task.points >= parseInt(filters.points, 10) : true)
    );
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const confirmDelete = () => {
    deleteMutation.mutate(taskToDelete._id);
    setTaskToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex items-center justify-center">
        LOADING...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex items-center justify-center">
        ERROR...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <div className="max-w-screen-xl mx-auto p-6">
        {/* Back to Dashboard */}
        <div className="flex justify-start mb-4">
          <Link
            to="/adminDashboard"
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white shadow-md"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center mb-2">
            <FaTasks className="text-blue-500 mr-3" />
            Task Management Portal
          </h1>
          <p className="text-lg text-gray-400">
            Assign, manage, and track tasks with ease.
          </p>
        </div>

        {/* Task Creation */}
        <div className="mb-8">
          <TaskCreationForm
            taskToEdit={taskToEdit}
            clearEditTask={() => setTaskToEdit(null)}
          />
        </div>

        {/* Filter Section */}
        <div className="mb-8 p-4 rounded-lg bg-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
            <FaTasks className="text-yellow-400 mr-2" />
            Filter and Search Tasks
          </h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-white mb-1">Type</label>
              <select
                name="type"
                onChange={handleFilterChange}
                className="p-2 w-full rounded bg-gray-700 text-white"
              >
                <option value="">All Types</option>
                <option value="crowd control">Crowd Control</option>
                <option value="setup">Setup</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-1">Date</label>
              <input
                type="date"
                name="date"
                onChange={handleFilterChange}
                className="p-2 w-full rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Minimum Points</label>
              <input
                type="number"
                name="points"
                placeholder="e.g. 10"
                onChange={handleFilterChange}
                className="p-2 w-full rounded bg-gray-700 text-white"
              />
            </div>
          </form>
        </div>

        <div className="flex flex-col min-h-[700px]">
          {/* Cards Container */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 p-5">
            {currentTasks.map((task, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col min-h-[300px] border border-gray-700 hover:shadow-2xl transition-shadow duration-300 relative"
              >
                {/* Task Name */}
                <h3 className="text-md font-bold text-white mb-3 text-center">
                  {task.name}
                </h3>

                {/* Task Details */}
                <div className="text-gray-400 flex items-center mb-2">
                  <FaCalendarAlt className="mr-2 text-blue-400" />
                  <p>Date: {task.date}</p>
                </div>
                <div className="text-gray-400 flex items-center mb-2">
                  <FaClock className="mr-2 text-yellow-400" />
                  <p>Time: {task.time}</p>
                </div>
                <div className="text-gray-400 flex items-center mb-2">
                  <FaUsers className="mr-2 text-green-400" />
                  <p>Volunteers: {task.volunteers}</p>
                </div>
                <div className="text-gray-400 flex items-center mb-4">
                  <FaStar className="mr-2 text-yellow-500" />
                  <p>Points: {task.points}</p>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    onClick={() => setTaskToEdit(task)}
                    className="p-2 bg-yellow-500 rounded text-white flex items-center justify-center hover:bg-yellow-600 transition-colors"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => setTaskToDelete(task)}
                    className="p-2 bg-red-600 rounded text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <FaTrashAlt className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          {/* Pagination Logic */}
          {totalPages > 3 && currentPage > 2 && (
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 mx-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600"
            >
              1
            </button>
          )}
          {totalPages > 3 && currentPage > 2 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          {Array.from({ length: totalPages })
            .map((_, idx) => idx + 1)
            .filter(
              (page) => totalPages <= 3 || Math.abs(page - currentPage) <= 1
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
          {totalPages > 3 && currentPage < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          {totalPages > 3 && currentPage < totalPages - 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 mx-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600"
            >
              {totalPages}
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementPage;
