import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaMedal,
  FaClock,
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
import { toast } from "react-toastify";
import {
  BarChart,
  DonutChart,
  LineChart,
  PieChart,
  PointsBreakdownByTask,
  TaskCompletionHistory
} from "../charts";

export const loader = () => {
  // toast.warn(" Reminder: You are scheduled for Friday Prayer Setup tomorrow at 3 PM")
  return useUserData();
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();

  const { tasks, user, timeRecordData, events } = data;
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || userImg
  );

  //CHART CALCULATIONS

  //piechart
  const { pendingTaskLength, completedTaskLength } = tasks?.reduce(
    (acc, item) => {
      if (item.status === "pending") acc.pendingTaskLength++;
      if (item.status === "completed") acc.completedTaskLength++;
      return acc;
    },
    { pendingTaskLength: 0, completedTaskLength: 0 }
  ) || { pendingTaskLength: 0, completedTaskLength: 0 };

  //line chart

  const userPointsData = timeRecordData.map((item) => {
    return {
      createdAt: item.createdAt,
      totalPoints: item.pointsEarned
    };
  });

  //donut chart:

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const completedEvents = events.filter(
    (event) => event.status === "completed"
  ).length;

  //bar chart:

  const minutesWorked = timeRecordData.map((item) =>
    ((item.timeSpent) / 60).toFixed(0)
  );

  const nameList = timeRecordData.map((item) => item.name.slice(0,26));



  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  const userName = user?.username || "User";

  // Points History
  const pointsHistory = timeRecordData?.map((record) => ({
    task: record.name,
    date: new Date(record.clockOut).toLocaleDateString(),
    points: record.pointsEarned
  }));

  // Total Points
  const totalPoints = timeRecordData?.reduce(
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
        {/* Navigation Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 max-w-[77rem] mx-auto">
          <Link to={`/profile/${user._id}`}>
            <div className="flex flex-col sm:flex-row items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 transform hover:scale-105 hover:bg-purple-700 transition duration-200">
              <FaUser className="text-4xl text-purple-400 mb-2 sm:mb-0 sm:mr-4" />
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-white sm:text-lg md:text-xl">
                  Profile
                </p>
                <p className="text-gray-400">View and edit your profile</p>
              </div>
            </div>
          </Link>

          <Link to="/records">
            <div className="flex flex-col sm:flex-row items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 transform hover:scale-105 hover:bg-yellow-700 transition duration-200">
              <FaMedal className="text-4xl text-yellow-400 mb-2 sm:mb-0 sm:mr-4" />
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-white sm:text-lg md:text-xl">
                  Points Summary
                </p>
                <p className="text-gray-400">Track your points and history</p>
              </div>
            </div>
          </Link>

          <Link to="/clockInOut">
            <div className="flex flex-col sm:flex-row items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 transform hover:scale-105 hover:bg-green-700 transition duration-200">
              <FaClock className="text-4xl text-green-400 mb-2 sm:mb-0 sm:mr-4" />
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-white sm:text-lg md:text-xl">
                  Clock In/Out
                </p>
                <p className="text-gray-400">Manage your volunteering hours</p>
              </div>
            </div>
          </Link>
        </div>

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

        {/* Notifications Section */}
        <div className="card w-full bg-gray-800 shadow-xl border border-gray-700 mt-6 mb-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <DonutChart
            completedTasks={completedTaskLength}
            pendingTasks={pendingTaskLength}
          />
          <LineChart userPointsData={userPointsData} />
          <BarChart minutesWorked={minutesWorked} nameList={nameList} />
          <PieChart tasks={completedTasks} events={completedEvents} />
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
                  {pointsHistory?.slice(0, 4)?.map((entry, index) => (
                
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

        {/* Upcoming and Available Tasks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
            <div className="card-body">
              <div className="flex items-center mb-3">
                <FaTasks className="text-xl text-green-400 mr-2" />
                <h2 className="card-title text-lg font-semibold text-white">
                  Upcoming Tasks
                </h2>
              </div>
              <div className="space-y-4">
                {tasks?.slice(0, 2)?.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 flex justify-between items-center transition duration-200"
                  >
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-gray-400">Date: {item.date}</p>
                      <p className="text-gray-400">Points: {item.points}</p>
                    </div>
                    <Link
                      to="/clockInOut"
                      className="px-4 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                      Clock In
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/clockInOut"
                  className="px-4 py-2 inline-flex items-center justify-center bg-gray-700 text-green-400 border border-green-500 rounded-lg font-medium text-sm hover:bg-green-500 hover:text-gray-900 transition duration-300"
                >
                  <FaArrowRight className="mr-2" />
                  View All Tasks for Clock In
                </Link>
              </div>
            </div>
          </div>

          {/* Available Tasks */}
          <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
            <div className="card-body">
              <div className="flex items-center mb-3">
                <FaClipboardList className="text-xl text-purple-400 mr-2" />
                <h2 className="card-title text-lg font-semibold text-white">
                  Available Tasks
                </h2>
              </div>
              <div className="space-y-4">
                {tasks?.slice(0, 2)?.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 flex justify-between items-center transition duration-200"
                  >
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-gray-400">Date: {item.date}</p>
                      <p className="text-gray-400">Points: {item.points}</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                      Sign Up
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/tasks"
                  className="px-4 py-2 inline-flex items-center justify-center bg-gray-700 text-purple-400 border border-purple-500 rounded-lg font-medium text-sm hover:bg-purple-500 hover:text-gray-900 transition duration-300"
                >
                  <FaArrowRight className="mr-2" />
                  View All Available Tasks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
