import React from "react";
import { PointsEarnedByVolunteers, VolunteerHoursOverTime } from "../charts";
import { FaClock, FaStar, FaUserFriends } from "react-icons/fa"; // Import Font Awesome icons
import { FaTasks, FaUsers, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const adminName = "Admin"; // Replace with actual admin name if available

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-screen-xl">
        {/* Welcome Message */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body flex items-center">
            <FaUser className="text-2xl text-blue-400 mr-3" />
            <div>
              <h2 className="card-title text-xl font-bold text-white">
                Welcome back, [{adminName}]!
              </h2>
              <p className="text-gray-400 text-center">here is your overview matrics</p>
            </div>
          </div>
        </div>

        {/* Overview Section with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaClock className="text-4xl text-blue-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">200</p>
              <p className="text-gray-400">Total Volunteer Hours</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaStar className="text-4xl text-yellow-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">1200</p>
              <p className="text-gray-400">Points Distributed</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaUserFriends className="text-4xl text-green-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">3</p>
              <p className="text-gray-400">Active Volunteers</p>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="flex flex-col lg:flex-row lg:space-x-4 mb-6">
          <div className="flex-1">
            <VolunteerHoursOverTime />
          </div>
          <div className="flex-1">
            <PointsEarnedByVolunteers />
          </div>
        </div>

        {/* Navigation Links to Each Management Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <Link to="/adminDashboard/task-management">
            <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
              <FaTasks className="text-4xl text-blue-400 mr-4" />
              <div>
                <p className="text-3xl font-semibold text-white">
                  Task Management
                </p>
                <p className="text-gray-400">Manage tasks efficiently</p>
              </div>
            </div>
          </Link>

          <Link to="/adminDashboard/volunteer-management">
            <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
              <FaUsers className="text-4xl text-green-400 mr-4" />
              <div>
                <p className="text-3xl font-semibold text-white">
                  Volunteer Management
                </p>
                <p className="text-gray-400">
                  Manage volunteers and their hours
                </p>
              </div>
            </div>
          </Link>

          <Link to="/adminDashboard/event-management">
            <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
              <FaCalendarAlt className="text-4xl text-yellow-400 mr-4" />
              <div>
                <p className="text-3xl font-semibold text-white">
                  Event Management
                </p>
                <p className="text-gray-400">Manage events and schedules</p>
              </div>
            </div>
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
