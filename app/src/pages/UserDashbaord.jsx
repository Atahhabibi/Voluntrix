import React, { useEffect, useState } from "react";
import { PointsBreakdownByTask, TaskCompletionHistory } from "../charts";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImg from "../images/atah.jpg";
import { useDispatch } from "react-redux";
import {
  FaMedal,
  FaTasks,
  FaClipboardList,
  FaBell,
  FaUser
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { useQuery } from "@tanstack/react-query";
import { setUserData } from "../features/user/userSlice";

const fetchUserData = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No Token found, Please log in");
  }

  const response = await customFetch("/user", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.user; // Make sure the response contains user data
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // Track hover effect

  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData
  });

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data)); // Dispatch only when data is available
    }
  }, [data, dispatch]);

  const userName = data?.username || "User"; // Dynamically set the username from the fetched data
  const userProfileImage = profileImage || data?.profileImage || userImg; // Use dynamic profile image

  // Sample points data for history (replace with dynamic data if available)
  const pointsHistory = data?.pointsHistory || [
    { task: "Friday Prayer Setup", date: "March 5", points: 10 },
    { task: "Eid Parking Management", date: "March 10", points: 20 },
    { task: "Community Clean-Up", date: "March 15", points: 15 }
  ];

  // Calculate the total points earned from the history dynamically
  const totalPoints = pointsHistory.reduce(
    (sum, entry) => sum + entry.points,
    0
  );

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      const token = localStorage.getItem("authToken");
      const response = await customFetch.post("/upload-profile-pic", formData);

      console.log(response);

      if (response.success) {
        setProfileImage(URL.createObjectURL(file)); // Update local state with the uploaded image
        toast.success("Profile picture updated successfully!");
      } else {
        toast.error("Failed to upload profile picture.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div>Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-screen-xl">
      

        {/* Welcome Message with Profile Picture */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body flex items-center flex-col">
            {/* Make the image clickable and track hover state */}
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <img
                src={userProfileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
              />
              <label className="btn btn-outline btn-primary flex items-center cursor-pointer">
                Upload New Photo
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
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
                <Link to="/clockInOut" className="btn btn-success">
                  Clock In
                </Link>
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
