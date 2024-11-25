import React, { useEffect, useState } from "react";
import {
  FaMedal,
  FaTasks,
  FaClipboardList,
  FaBell,
  FaArrowRight
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import userImg from "../images/atah.jpg";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/user/userSlice";
import useUserData from "../util/useUserData";

export const loader = () => {
  return useUserData();
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();

  const { tasks, user, timeRecordData } = data;
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || userImg
  );

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  const userName = user?.username || "User";

  // Points History
  const pointsHistory = timeRecordData.map((record) => ({
    task: record.taskName,
    date: new Date(record.clockOut).toLocaleDateString(),
    points: record.pointsEarned
  }));

  // Total Points
  const totalPoints = timeRecordData.reduce(
    (sum, record) => sum + record.pointsEarned,
    0
  );

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await fetch("/api/v1/upload-profile-pic", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        const data = await response.json();
        if (data.success) {
          setProfileImage(URL.createObjectURL(file));
        } else {
          alert("Failed to upload image.");
        }
      } catch (error) {
        console.error("Image upload error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-screen-xl">
        {/* Welcome Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body flex items-center flex-col">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <label className="btn btn-outline btn-primary flex items-center cursor-pointer">
              Upload New Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back, {userName}!
            </h2>
            <p className="text-gray-400 text-center">
              Thank you for your contributions!
            </p>
          </div>
        </div>

        {/* Points Summary */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body">
            <div className="flex items-center mb-3">
              <FaMedal className="text-xl text-yellow-400 mr-2" />
              <h2 className="card-title text-lg font-semibold text-white">
                Points Summary
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              Total Points Earned: {totalPoints}
            </p>

            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-gray-800 text-gray-200 rounded-lg shadow-md text-sm border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-700 text-center">
                    <th className="px-4 py-2 border border-gray-700">
                      Task Name
                    </th>
                    <th className="px-4 py-2 border border-gray-700">Date</th>
                    <th className="px-4 py-2 border border-gray-700">
                      Points Earned
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pointsHistory.slice(0, 4).map((entry, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-700 hover:bg-gray-700 transition text-center"
                    >
                      <td className="px-4 py-2 border border-gray-700">
                        {entry.task}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {entry.date}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {entry.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <Link
                to="/records"
                className="text-blue-400 hover:underline flex items-center"
              >
                View All Records
                <FaArrowRight className="ml-2" />
              </Link>
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
              {tasks.slice(0, 2).map((item) => (
                <div
                  key={item._id}
                  className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-gray-400">Date: {item.date}</p>
                    <p className="text-gray-400">Points: {item.points}</p>
                  </div>
                  <Link to="/clockInOut" className="btn btn-success">
                    Clock In
                  </Link>
                </div>
              ))}
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
              {tasks.slice(0, 2).map((item) => (
                <div
                  key={item._id}
                  className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-gray-400">Date: {item.date}</p>
                    <p className="text-gray-400">Points: {item.points}</p>
                  </div>
                  <button className="btn btn-primary">Sign Up</button>
                </div>
              ))}
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
