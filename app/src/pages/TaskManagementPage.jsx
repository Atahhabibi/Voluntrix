import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaStar,
  FaTasks
} from "react-icons/fa";
import TaskCreationForm from "../components/TaskCreationForm";
import { customFetch } from "../util/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [taskToEdit]);

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
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white flex items-center justify-center mb-2">
            <FaTasks className="text-blue-500 mr-2" />
            Task Management Portal
          </h1>
          <p className="text-sm sm:text-lg text-gray-400">
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
          <div className="text-center text-xl text-gray-400">
            No tasks available. Create one!
          </div>
        ) : (
          <>
            {/* Filter Section */}
            <div className="mb-8 p-4 sm:p-6 rounded-lg bg-gray-800 shadow-lg">
              <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4 flex items-center">
                <FaTasks className="text-yellow-400 mr-2" />
                Filter and Search Tasks
              </h2>
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Filters */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={filters.name}
                    placeholder="Enter task name"
                    onChange={handleFilterChange}
                    className="p-2 w-full bg-gray-700 text-white rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    className="p-2 w-full bg-gray-700 text-white rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Minimum Points
                  </label>
                  <input
                    type="number"
                    name="points"
                    value={filters.points}
                    onChange={handleFilterChange}
                    placeholder="e.g., 10"
                    className="p-2 w-full bg-gray-700 text-white rounded focus:outline-none"
                  />
                </div>
                <div className="sm:mt-7">
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="p-2 w-full bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Clear Filters
                  </button>
                </div>
              </form>
            </div>

            {/* Tasks Section */}
            <div className="min-h-[700px]">
              {filteredTasks.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <h2 className="text-lg text-gray-400">
                    No tasks match your filter criteria.
                  </h2>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentTasks.map((task) => (
                    <div
                      key={task._id}
                      className="p-4 rounded-lg bg-gray-800 shadow-md flex flex-col min-h-[300px]"
                    >
                      <h3 className="text-lg font-bold text-white mb-4">
                        {task.name}
                      </h3>
                      <p className="text-gray-400">
                        <FaCalendarAlt className="inline-block text-blue-400 mr-2" />
                        Date: {formatDate(task.date)}
                      </p>
                      <p className="text-gray-400">
                        <FaClock className="inline-block text-yellow-400 mr-2" />
                        Time: {task.time}
                      </p>
                      <p className="text-gray-400">
                        <FaUsers className="inline-block text-green-400 mr-2" />
                        Volunteers: {task.volunteersNeeded}
                      </p>
                      <p className="text-gray-400">
                        <FaStar className="inline-block text-yellow-500 mr-2" />
                        Points: {task.points}
                      </p>
                      <div className="flex mt-auto space-x-2">
                        <button
                          onClick={() => setTaskToEdit(task)}
                          className="flex-1 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(task)}
                          className="flex-1 p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Pagination */}
        {filteredTasks.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === idx + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600 mx-2"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 mx-2"
            >
              Next
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
    </div>
  );
};

export default TaskManagementPage;
