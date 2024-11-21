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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const TaskManagementPage = () => {
  const queryClient = useQueryClient();

  const dispatach=useDispatch(); 
  const store=useSelector((store)=>store); 

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const resposne = await customFetch("/tasks");
      return resposne;
    }
  });

  const tasks = data?.data?.tasks || [];

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await customFetch.delete(`/tasks/${taskToDelete._id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setTaskToDelete(null);
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error deleting item", error);
    }
  });

  const [filters, setFilters] = useState({
    type: "",
    date: "",
    points: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
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

  // Calculate total pages
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  // Get current page tasks
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle previous and next buttons
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowModal(true);
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
  };
  const clearEditTask = () => {
    setTaskToEdit(null);
  };

  const confirmDelete = (task) => {
    setShowModal(false);
    deleteMutation.mutate(task._id);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
        LOADING....
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
        ERROR....
      </div>
    );
  }
 return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Back to Dashboard Button */}
      <div className="flex justify-start mb-4">
        <Link
          to="/adminDashboard"
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white shadow-md"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header Section */}
      <div className="w-full max-w-screen-xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-white flex items-center justify-center mb-2">
          <FaTasks className="text-blue-500 mr-3" />
          Task Management Portal
        </h1>
        <p className="text-lg text-gray-400 flex items-center justify-center">
          <FaUsers className="text-yellow-400 mr-2" />
          Assign, manage, and track tasks with ease.
        </p>
      </div>

      {/* Task Creation Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
          <FaEdit className="text-green-400 mr-2" />
          Create a New Task
        </h2>
        <TaskCreationForm
          taskToEdit={taskToEdit}
          clearEditTask={clearEditTask}
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

      {/* Tasks Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
          <FaTasks className="text-blue-500 mr-2" />
          Current Tasks
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentTasks.map((task, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg bg-gray-800 flex flex-col"
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {task.name}
              </h3>
              <div className="text-gray-400 flex items-center space-x-2">
                <FaCalendarAlt />
                <p>Date: {task.date}</p>
              </div>
              <div className="text-gray-400 flex items-center space-x-2">
                <FaClock />
                <p>Time: {task.time}</p>
              </div>
              <div className="text-gray-400 flex items-center space-x-2">
                <FaUsers />
                <p>Volunteers Needed: {task.volunteers}</p>
              </div>
              <div className="text-gray-400 flex items-center space-x-2">
                <FaStar className="text-yellow-500" />
                <p>Points: {task.points}</p>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => handleEditClick(task)}
                  className="p-2 bg-yellow-500 rounded text-white flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(task)}
                  className="p-2 bg-red-600 rounded text-white flex items-center"
                >
                  <FaTrashAlt className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded shadow-lg text-center">
            <h3 className="text-2xl text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete "{taskToDelete?.name}"?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => confirmDelete(taskToDelete)}
                className="px-4 py-2 bg-red-600 rounded text-white"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default TaskManagementPage;
