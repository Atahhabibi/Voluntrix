import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import useAppData from "../util/CustomHooks/useAppData";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { formatDate } from "../util/dataHandlingFunctions";
import { PageError, PageLoading } from "../components";

const TaskManagementPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useAppData();

  const tasks = data?.tasks?.data || [];

  const deleteMutation = useMutation({
    mutationFn: async (taskId) => {
      const response = await customFetch.delete(`/tasks/${taskId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["AppData"]);
      setTaskToDelete(null);
      toast.success("Task deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting task");
    }
  });

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    points: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [taskToEdit]);

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.name
        ? task.name.toLowerCase().includes(filters.name.toLowerCase())
        : true) &&
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

  const handleClearFilters = () => {
    setFilters({
      name: "",
      date: "",
      points: ""
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(taskToDelete._id);
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return <PageError />;
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <div className="max-w-screen-xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
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
            tasks={tasks}
            setTaskToEdit={setTaskToEdit}
          />
        </div>

        {tasks.length === 0 ? (
          <div className="text-center text-xl">
            No tasks available Create one{" "}
          </div>
        ) : (
          <div>
            {/* Filter Section */}
            <div className="mb-8 p-6 rounded-lg bg-gray-800 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <FaTasks className="text-yellow-400 mr-2" />
                  Filter and Search Tasks
                </h2>
              </div>
              <form className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 items-end">
                {/* Task Name Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={filters.name}
                    placeholder="Enter task name"
                    onChange={handleFilterChange}
                    className="p-3 h-[44px] w-full rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    className="p-3 h-[44px] w-full rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Minimum Points Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Minimum Points
                  </label>
                  <input
                    type="number"
                    name="points"
                    value={filters.points}
                    placeholder="e.g., 10"
                    onChange={handleFilterChange}
                    className="p-3 h-[44px] w-full rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleClearFilters}
                    type="button"
                    className="px-6 py-2 h-[44px] bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center w-full "
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
            {/* Cards Container */}
            <div className="flex flex-col min-h-[700px]">
              {filteredTasks.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <h2 className="text-lg text-gray-400">
                    No tasks match your filter criteria.
                  </h2>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 p-5">
                  {currentTasks.map((task, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-lg shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col min-h-[300px] border border-gray-700 hover:shadow-2xl transition-shadow duration-300 relative"
                    >
                      <h3 className="text-md font-bold text-white mb-3 text-center">
                        {task.name}
                      </h3>
                      <div className="text-gray-400 flex items-center mb-2">
                        <FaCalendarAlt className="mr-2 text-blue-400" />
                        <p>Date: {formatDate(task.date)}</p>
                      </div>
                      <div className="text-gray-400 flex items-center mb-2">
                        <FaClock className="mr-2 text-yellow-400" />
                        <p>Time: {task.time}</p>
                      </div>
                      <div className="text-gray-400 flex items-center mb-2">
                        <FaUsers className="mr-2 text-green-400" />
                        <p>Volunteers: {task.volunteersNeeded}</p>
                      </div>
                      <div className="text-gray-400 flex items-center mb-4">
                        <FaStar className="mr-2 text-yellow-500" />
                        <p>Points: {task.points}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <button
                          onClick={() => setTaskToEdit(task)}
                          className="p-2 bg-yellow-500 rounded text-white flex items-center justify-center hover:bg-yellow-600 transition-colors"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(task)}
                          className="p-2 bg-red-600 rounded text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                        >
                          <FaTrashAlt className="mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredTasks.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === idx + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default TaskManagementPage;
