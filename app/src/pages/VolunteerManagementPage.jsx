import React, { useState } from "react";
import { FaClock, FaStar, FaUser, FaSearch } from "react-icons/fa";
import { volunteers } from "../personsData";

const VolunteerManagementPage = () => {
  const [minPoints, setMinPoints] = useState("");
  const [minHours, setMinHours] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredVolunteers = volunteers.filter((volunteer) => {
    return (
      (minPoints ? volunteer.points >= parseInt(minPoints, 10) : true) &&
      (minHours ? volunteer.hoursWorked >= parseInt(minHours, 10) : true) &&
      (nameFilter ? volunteer.name.toLowerCase().includes(nameFilter.toLowerCase()) : true)
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);

  // Get current page items and ensure 6 slots per page
  const currentVolunteers = filteredVolunteers.slice(
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

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Volunteer Management</h2>

        {/* Filter Section */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Filter Volunteers</h3>
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
              <label className="block text-white mb-1">Minimum Hours Worked</label>
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

        {/* Volunteer Cards Container */}
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
                        <FaStar />
                        <p>Points: {volunteer.points}</p>
                      </div>

                      <button className="mt-4 p-2 bg-blue-500 rounded text-white flex items-center">
                        <FaUser className="mr-1" /> View Profile
                      </button>
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
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"
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
    </div>
  );
};

export default VolunteerManagementPage;



