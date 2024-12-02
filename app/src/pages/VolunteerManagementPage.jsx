import React, { useState } from "react";
import {
  FaCrown,
  FaStar,
  FaArrowLeft,
  FaUsers,
  FaClock,
  FaUser,
  FaSearch
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAppData from "../util/CustomHooks/useAppData";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const VolunteerManagementPage = () => {
  const queryClient = useQueryClient();
  const { data: appData, isLoading, error } = useAppData();

  const volunteers = appData?.users?.data || [];

  const [minPoints, setMinPoints] = useState("");
  const [minHours, setMinHours] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null); // For Delete Modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

  const itemsPerPage = 6;

  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const response = await customFetch.delete(`/deleteVolunteer/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Volunteer deleted successfully");
      queryClient.invalidateQueries("AppData");
      setIsModalOpen(false);
      setSelectedVolunteer(null);
    },
    onError: () => {
      toast.error("Error deleting volunteer");
    }
  });

  const filteredVolunteers = volunteers.filter((volunteer) => {
    return (
      (minPoints ? volunteer.totalPoints >= parseInt(minPoints, 10) : true) &&
      (minHours ? volunteer.hoursWorked >= parseInt(minHours, 10) : true) &&
      (nameFilter
        ? volunteer.username.toLowerCase().includes(nameFilter.toLowerCase())
        : true)
    );
  });

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);

  const currentVolunteers = filteredVolunteers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setNameFilter("");
    setMinPoints("");
    setMinHours("");
    setCurrentPage(1);
  };

  const handleDeleteClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedVolunteer) {
      deleteUserMutation.mutate(selectedVolunteer._id);
    }
  };

  if (isLoading) {
    return <div className="p-6 bg-gray-900 text-gray-200">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-900 text-gray-200">
        Error: {error.message}
      </div>
    );
  }

  if (volunteers.length === 0) {
    return (
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex items-center justify-center">
        No volunteers available.
      </div>
    );
  }

  const topVolunteers = [...volunteers]
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 3);

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="max-w-[1280px] mx-auto">
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
            <FaUsers className="text-blue-500 mr-3" />
            Volunteer Management Portal
          </h1>
          <p className="text-lg text-gray-400 flex items-center justify-center">
            <FaClock className="text-yellow-400 mr-2" />
            Manage and monitor volunteers' activities and achievements.
          </p>
        </div>

        {/* Leaderboard */}
        {topVolunteers.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-6">
            <h2 className="text-2xl font-semibold text-center text-yellow-400 mb-4 flex items-center justify-center">
              <FaCrown className="mr-2 text-yellow-400" /> Top 3 Volunteers
            </h2>
            <table className="table-auto w-full text-gray-400 text-sm border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white text-center">
                  <th className="px-4 py-2 border border-gray-600">Image</th>
                  <th className="px-4 py-2 border border-gray-600">Name</th>
                  <th className="px-4 py-2 border border-gray-600">Points</th>
                </tr>
              </thead>
              <tbody>
                {topVolunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="text-center">
                    <td className="px-4 py-2 border border-gray-600">
                      <img
                        src={volunteer.profileImage}
                        alt={volunteer.username}
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-gray-300 font-semibold">
                      {volunteer.username}
                    </td>
                    <td className="px-4 py-2 border border-gray-600  text-gray-300 font-semibold">
                      {volunteer.totalPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
            <FaSearch className="text-yellow-400 mr-2" />
            Filter Volunteers
          </h2>
          <form className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 items-end">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Search by Name
              </label>
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="e.g., John"
                className="p-3 rounded-lg bg-gray-700 text-white w-full focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Minimum Points
              </label>
              <input
                type="number"
                value={minPoints}
                onChange={(e) => setMinPoints(e.target.value)}
                placeholder="e.g., 50"
                className="p-3 rounded-lg bg-gray-700 text-white w-full focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Minimum Hours Worked
              </label>
              <input
                type="number"
                value={minHours}
                onChange={(e) => setMinHours(e.target.value)}
                placeholder="e.g., 10"
                className="p-3 rounded-lg bg-gray-700 text-white w-full focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleClearFilters}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Volunteer Cards Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 min-h-[680px]">
          {currentVolunteers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentVolunteers.map((volunteer) => (
                <div
                  key={volunteer._id}
                  className="p-4 rounded-lg shadow-md bg-gray-800 border border-gray-700"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={volunteer.profileImage}
                      alt={`${volunteer.username}'s profile`}
                      className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg"
                    />
                    <h3 className="text-2xl font-semibold text-white">
                      {volunteer.username}
                    </h3>
                    <div className="mt-2 text-gray-400 flex items-center space-x-2">
                      <FaClock />
                      <p>Hours Worked: {volunteer.hoursWorked}</p>
                    </div>
                    <div className="text-gray-400 flex items-center space-x-2">
                      <FaStar className="text-yellow-500" />
                      <p>Points: {volunteer.totalPoints}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                      <Link
                        className="p-2 bg-blue-500 rounded text-white flex justify-center items-center hover:bg-blue-600 transition"
                        to={`/profile/${volunteer._id}`}
                      >
                        <FaUser className="mr-1" /> View Profile
                      </Link>
                      <button
                        className="p-2 bg-red-500 rounded text-white flex justify-center items-center hover:bg-red-600 transition"
                        onClick={() => handleDeleteClick(volunteer)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              No volunteers match your filter criteria.
            </div>
          )}
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
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-4 py-2 rounded ${
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
          className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default VolunteerManagementPage;
