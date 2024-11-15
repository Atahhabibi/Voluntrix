import React, { useEffect } from "react";
import { PointsBreakdownByTask, TaskCompletionHistory } from "../charts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImg from '../images/atah.jpg';
import {
  FaMedal,
  FaTasks,
  FaClipboardList,
  FaBell,
  FaUser
} from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  // Sample points data for history (replace with dynamic data if available)
  const pointsHistory = [
    { task: "Friday Prayer Setup", date: "March 5", points: 10 },
    { task: "Eid Parking Management", date: "March 10", points: 20 },
    { task: "Community Clean-Up", date: "March 15", points: 15 }
  ];

  // Calculate the total points earned from the history
  const totalPoints = pointsHistory.reduce(
    (sum, entry) => sum + entry.points,
    0
  );

  // Show reminder notification when the component loads
  useEffect(() => {
    toast.info(
      "Reminder: You are scheduled for Friday Prayer Setup tomorrow at 3 PM.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: "#cbe633", color: "#000" }
      }
    );
  }, []);

  // Placeholder for the profile image URL
  const userProfileImage = userImg; // Replace with actual user profile picture URL
  const userName = "Atah habibi"; // Replace with actual user name

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-screen-xl">
        {/* Toast Container */}
        <ToastContainer />

        {/* Welcome Message with Profile Picture */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body flex items-center flex-col">
            <img
              src={userProfileImage}
              alt={`${userName}'s profile`}
              className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg"
            />
            <h2 className="card-title text-2xl font-bold text-white mb-1">
              Welcome back, {userName}!
            </h2>
            <p className="text-gray-400 text-center">
              Thank you for contributing to our community!
            </p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="flex flex-col lg:flex-row lg:space-x-4 mb-6">
          <div className="flex-1">
            <TaskCompletionHistory />
          </div>
          <div className="flex-1">
            <PointsBreakdownByTask />
          </div>
        </div>

        {/* Points Summary Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body">
            <div className="flex items-center mb-3">
              <FaMedal className="text-xl text-yellow-400 mr-2" />
              <h2 className="card-title text-lg font-semibold text-white">
                Points Summary
              </h2>
            </div>
            <p className="text-gray-400 mb-2">
              Total Points Earned: {totalPoints}
            </p>

            {/* Points History List */}
            <div className="border p-4 rounded-lg bg-gray-700 space-y-2">
              <h3 className="text-md font-semibold text-white">
                Points History
              </h3>
              {pointsHistory.map((entry, index) => (
                <div key={index} className="flex justify-between text-gray-400">
                  <span>
                    {entry.task} (Date: {entry.date})
                  </span>
                  <span>Points: {entry.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body">
            <div className="flex items-center mb-3">
              <FaTasks className="text-xl text-green-400 mr-2" />
              <h2 className="card-title text-lg font-semibold text-white">
                Upcoming Tasks
              </h2>
            </div>
            <div className="space-y-4">
              {/* Task Example */}
              <div className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">Friday Prayer Setup</p>
                  <p className="text-gray-400">Date: Friday, 3 PM</p>
                  <p className="text-gray-400">Points: 10</p>
                </div>
                <Link to="/clockInOut" className="btn btn-success">Clock In</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Available Tasks Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body">
            <div className="flex items-center mb-3">
              <FaClipboardList className="text-xl text-purple-400 mr-2" />
              <h2 className="card-title text-lg font-semibold text-white">
                Available Tasks
              </h2>
            </div>
            <div className="space-y-4">
              {/* Task Example */}
              <div className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">
                    Eid Parking Management
                  </p>
                  <p className="text-gray-400">Date: Monday, 9 AM</p>
                  <p className="text-gray-400">Points: 20</p>
                </div>
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <div className="flex items-center mb-3">
              <FaBell className="text-xl text-red-400 mr-2" />
              <h2 className="card-title text-lg font-semibold text-white">
                Notifications
              </h2>
            </div>
            <p className="text-gray-400">
              Reminder: You are scheduled for Friday Prayer Setup tomorrow at 3
              PM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
