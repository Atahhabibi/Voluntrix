import React, { useState } from "react";
import {
  FaClock,
  FaStar,
  FaUser,
  FaSearch,
  FaArrowLeft,
  FaUsers
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import { customFetch } from "../util/customFetch";

export const loader = async () => {
  try {
    const response = await customFetch("/users");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const VolunteerManagementPage = () => {
  const data = useLoaderData();
  const volunteers = data.volunteers;

  const [minPoints, setMinPoints] = useState("");
  const [minHours, setMinHours] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredVolunteers = volunteers.filter((volunteer) => {
    return (
      (minPoints ? volunteer.points >= parseInt(minPoints, 10) : true) &&
      (minHours ? volunteer.hoursWorked >= parseInt(minHours, 10) : true) &&
      (nameFilter
        ? volunteer.name.toLowerCase().includes(nameFilter.toLowerCase())
        : true)
    );
  });

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);

  const currentVolunteers = filteredVolunteers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
          <FaUsers className="text-blue-500 mr-3" />
          Volunteer Management Portal
        </h1>
        <p className="text-lg text-gray-400 flex items-center justify-center">
          <FaClock className="text-yellow-400 mr-2" />
          Manage and monitor volunteers' activities and achievements.
        </p>
      </div>

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
            />
          </div>
        </div>
      </div>

      {/* Volunteer Cards Section */}
      <div className="flex flex-col justify-between h-[700px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {Array.from({ length: itemsPerPage }, (_, index) => {
            const volunteer = currentVolunteers[index];
            return (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-lg ${
                  volunteer ? "bg-gray-800" : "bg-transparent"
                }`}
              >
                {volunteer ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={volunteer.profileImage}
                      alt={`${volunteer.name}'s profile`}
                      className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg"
                    />
                    <h3 className="text-2xl font-semibold text-white">
                      {volunteer.name}
                    </h3>
                    <div className="mt-2 text-gray-400 flex items-center space-x-2">
                      <FaClock />
                      <p>Hours Worked: {volunteer.hoursWorked}</p>
                    </div>
                    <div className="text-gray-400 flex items-center space-x-2">
                      <FaStar className="text-yellow-500" />
                      <p>Points: {volunteer.points}</p>
                    </div>
                    <Link
                      className="mt-4 p-2 bg-blue-500 rounded text-white flex items-center"
                      to={`/profile/${volunteer._id}`}
                    >
                      <FaUser className="mr-1" /> View Profile
                    </Link>
                  </div>
                ) : (
                  <div className="invisible">Placeholder</div>
                )}
              </div>
            );
          })}
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

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
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

export default VolunteerManagementPage;
