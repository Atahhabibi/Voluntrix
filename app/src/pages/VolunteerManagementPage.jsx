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
import { Link, useLoaderData } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAppData from "./../util/CustomHooks/useAppData";
import { useQueryClient } from "@tanstack/react-query";

const VolunteerManagementPage = () => {
  const queryClient = useQueryClient();
  const { data: appData, isLoading, error } = useAppData();

  const volunteers = appData?.users?.data || [];

  const [minPoints, setMinPoints] = useState("");
  const [minHours, setMinHours] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await customFetch.delete(`/deleteVolunteer/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error deleting volunteer:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries("AppData");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong while deleting volunteer");
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

  // Sort volunteers by points and get the top 3 performers
  const topVolunteers = [...volunteers]
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 3);

  const handleDelete = (id) => {
    deleteUserMutation.mutate(id);
    queryClient.invalidateQueries("AppData");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center">
      {/* Main Container */}
      <div className="w-full max-w-[1280px]">
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

        {/* Leaderboard Section */}
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-white mb-1">Search by Name</label>
              <div className="flex items-center bg-gray-700 rounded p-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="e.g., John"
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-white mb-1">Minimum Points</label>
              <input
                type="number"
                value={minPoints}
                onChange={(e) => setMinPoints(e.target.value)}
                placeholder="e.g., 50"
                className="p-2 rounded w-full bg-gray-700 text-white"
                min={0}
              />
            </div>
            <div>
              <label className="block text-white mb-1">
                Minimum Hours Worked
              </label>
              <input
                type="number"
                value={minHours}
                onChange={(e) => setMinHours(e.target.value)}
                placeholder="e.g., 10"
                className="p-2 rounded w-full bg-gray-700 text-white"
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Volunteer Cards Section */}

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 min-h-[680px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentVolunteers.length > 0 ? (
              currentVolunteers.map((volunteer, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg shadow-md bg-gray-800 border border-gray-700"
                >
                  <div className="flex flex-col items-center">
                    {/* Volunteer Image */}
                    <img
                      src={volunteer.profileImage}
                      alt={`${volunteer.username}'s profile`}
                      className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg"
                    />
                    {/* Volunteer Username */}
                    <h3 className="text-2xl font-semibold text-white">
                      {volunteer.username}
                    </h3>
                    {/* Volunteer Stats */}
                    <div className="mt-2 text-gray-400 flex items-center space-x-2">
                      <FaClock />
                      <p>Hours Worked: {volunteer.hoursWorked}</p>
                    </div>
                    <div className="text-gray-400 flex items-center space-x-2">
                      <FaStar className="text-yellow-500" />
                      <p>Points: {volunteer.totalPoints}</p>
                    </div>
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                      <Link
                        className="p-2 bg-blue-500 rounded text-white flex justify-center items-center hover:bg-blue-600 transition"
                        to={`/profile/${volunteer._id}`}
                      >
                        <FaUser className="mr-1" /> View Profile
                      </Link>
                      <button
                        className="p-2 bg-red-500 rounded text-white flex justify-center items-center hover:bg-red-600 transition"
                        onClick={() => handleDelete(volunteer._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">
                No volunteers available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        {(() => {
          const pagination = [];
          if (totalPages <= 5) {
            // Show all pages if totalPages is 5 or fewer
            for (let i = 1; i <= totalPages; i++) {
              pagination.push(
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                  }`}
                >
                  {i}
                </button>
              );
            }
          } else {
            // Always show the first page
            pagination.push(
              <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                1
              </button>
            );

            // Add "..." if needed before the current page range
            if (currentPage > 3) {
              pagination.push(
                <span key="start-ellipsis" className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            // Show pages around the current page
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) {
              pagination.push(
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                  }`}
                >
                  {i}
                </button>
              );
            }

            // Add "..." if needed after the current page range
            if (currentPage < totalPages - 2) {
              pagination.push(
                <span key="end-ellipsis" className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            // Always show the last page
            pagination.push(
              <button
                key={totalPages}
                onClick={() => handlePageChange(totalPages)}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {totalPages}
              </button>
            );
          }
          return pagination;
        })()}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VolunteerManagementPage;
