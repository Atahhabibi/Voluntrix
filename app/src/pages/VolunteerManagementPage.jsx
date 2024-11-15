import React, { useState } from "react";
import { FaClock, FaStar, FaUser, FaSearch } from "react-icons/fa";
import { volunteers } from "../personsData";

const VolunteerManagementPage = () => {
  const [minPoints, setMinPoints] = useState("");
  const [minHours, setMinHours] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const filteredVolunteers = volunteers.filter((volunteer) => {
    return (
      (minPoints ? volunteer.points >= parseInt(minPoints, 10) : true) &&
      (minHours ? volunteer.hoursWorked >= parseInt(minHours, 10) : true) &&
      (nameFilter ? volunteer.name.toLowerCase().includes(nameFilter.toLowerCase()) : true)
    );
  });

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

        {/* Volunteer Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVolunteers.map((volunteer) => (
            <div key={volunteer.id} className="p-4 rounded-lg bg-gray-800 shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src={volunteer.profileImage}
                  alt={`${volunteer.name}'s profile`}
                  className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg"
                />
                <h3 className="text-2xl font-semibold text-white">{volunteer.name}</h3>

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerManagementPage;
