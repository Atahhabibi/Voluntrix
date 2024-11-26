import React from "react";
import {
  FaClock,
  FaStar,
  FaUserFriends,
  FaTasks,
  FaUsers,
  FaCalendarAlt,
  FaBell,
  FaChartPie,
  FaTable
} from "react-icons/fa";
import { Link } from "react-router-dom";
import imamImg from "../images/imam.png";
import {
  EventAttendanceStatus,
  PointsEarnedByUsers,
  TaskPointsDistribution,
  UserParticipationOverview
} from "../charts";
import {
  EventOverviewTable,
  TaskOverviewTable,
  VolunteerTable
} from "../components";

const AdminDashboard = () => {
  const adminName = "Sheikh Hamzah Khalid";

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-screen-xl">
        {/* Navigation Links */}
        <div className="grid grid-cols-1 gap-6 mb-6 max-w-[77rem] m-auto sm:grid-cols-2 md:grid-cols-3">
          <Link to="/volunteer-management">
            <div className="flex flex-col sm:flex-row items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 transform hover:scale-105 hover:bg-green-700 transition duration-200">
              <FaUsers className="text-4xl text-green-400 mb-2 sm:mb-0 sm:mr-4" />
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-white sm:text-lg md:text-xl">
                  Volunteer Management
                </p>
                <p className="text-gray-400">
                  Manage volunteers and their hours
                </p>
              </div>
            </div>
          </Link>
          <Link to="/task-management">
            <div className="flex flex-col sm:flex-row items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 transform hover:scale-105 hover:bg-blue-700 transition duration-200">
              <FaTasks className="text-4xl text-blue-400 mb-2 sm:mb-0 sm:mr-4" />
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-white sm:text-lg md:text-xl">
                  Task Management
                </p>
                <p className="text-gray-400">Create and manage tasks</p>
              </div>
            </div>
          </Link>
          <Link to="/event-management">
            <div className="flex flex-col sm:flex-row items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 transform hover:scale-105 hover:bg-yellow-600 transition duration-200">
              <FaCalendarAlt className="text-4xl text-yellow-400 mb-2 sm:mb-0 sm:mr-4" />
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-white sm:text-lg md:text-xl">
                  Event Management
                </p>
                <p className="text-gray-400">Create and manage events</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Welcome Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700 max-w-[77rem] m-auto">
          <div className="card-body flex items-center flex-col">
            <div className="flex flex-col items-center">
              <img
                src={imamImg}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
              />
              <label className="btn btn-outline btn-primary flex items-center cursor-pointer">
                Upload New Photo
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
            <h2 className="card-title text-2xl font-bold text-white mb-1">
              Welcome back, {adminName}!
            </h2>
            <p className="text-gray-400 text-center">
              Here's your dashboard overview.
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 max-w-[77rem] m-auto ">
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

        {/* Charts Section */}
        <div className="mb-10 p-6">
          <h3 className="text-xl font-bold text-white flex items-center mb-4">
            <FaChartPie className="text-yellow-400 mr-2" /> Key Charts Overview
          </h3>
          <p className="text-gray-400 mb-4">
            Gain insights from the data visualization below.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <EventAttendanceStatus />
            <TaskPointsDistribution />
            <PointsEarnedByUsers />
            <UserParticipationOverview />
          </div>
        </div>

        {/* Tables Section */}
        <div className="mb-10 p-6'">
          <h3 className="text-xl font-bold text-white flex items-center mb-4 px-6">
            <FaTable className="text-blue-400 mr-2 " /> Volunteer and Task
            Management Tables
          </h3>
          <p className="text-gray-400 mb-4 px-6">
            Review detailed insights on volunteers, tasks, and events below.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
            <VolunteerTable />
            <TaskOverviewTable />
          </div>

        </div>

        <div className="px-6">
        <EventOverviewTable />

        </div>

        {/* Link to View More Features */}
        <div className="flex justify-center mb-6">
          <Link
            to="/detailChartsPage"
            className="btn btn-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
          >
            View More Charts and Features
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
