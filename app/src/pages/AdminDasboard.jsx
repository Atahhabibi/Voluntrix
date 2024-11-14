import React from "react";
import { PointsEarnedByVolunteers, VolunteerHoursOverTime } from "../charts";
import { FaClock, FaStar, FaUserFriends } from "react-icons/fa"; // Import Font Awesome icons

const AdminDashboard = () => {
  const adminName = "Admin"; // Replace with actual admin name if available

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-screen-xl">
        {/* Personalized Welcome Message */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Welcome back, {adminName}!
          </h2>
          <p className="text-gray-400">
            Here’s a summary of your dashboard metrics:
          </p>
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

        {/* Task Management Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold text-white">
              Task Management
            </h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">Friday Prayer Setup</p>
                  <p className="text-gray-400">Date: Friday, 3 PM</p>
                  <p className="text-gray-400">Volunteers: 3/5</p>
                </div>
                <div className="space-x-2">
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-error">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Management Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold text-white">
              Volunteer Management
            </h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">Ahmed Khan</p>
                  <p className="text-gray-400">Hours: 20</p>
                  <p className="text-gray-400">Points: 80</p>
                </div>
                <button className="btn btn-primary">View Profile</button>
              </div>
            </div>
          </div>
        </div>

        {/* Event Management Section */}
        <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold text-white">
              Event Management
            </h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">Eid Prayer</p>
                  <p className="text-gray-400">Date: April 10, 9 AM</p>
                </div>
                <div className="space-x-2">
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-error">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
