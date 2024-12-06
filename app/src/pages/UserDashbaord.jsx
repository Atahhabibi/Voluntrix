import React from "react";
import {
  FaUser,
  FaMedal,
  FaClock,
  FaTasks,
  FaClipboardList,
  FaBell,
  FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useUserData from "../util/customHooks/useUserData";
import { BarChart, DonutChart, LineChart, PieChart } from "../charts";

import useHandleImageUpload from "../util/handleImageUpload";
import TaskReminder from "../components/TaskRemainder";
import categorizeTasksAndEvents from "../util/categorizeTasksAndEvents";
import getClosestTaskEventsOfToday from "../util/getClosestTaskEventsOfToday";
import { formatDate } from "../util/dataHandlingFunctions";
import { PageError, PageLoading } from "../components";
import { customFetchForAll } from "../util/customFetch";
import { useQuery } from "@tanstack/react-query";

const fetchEventsTasks = async () => {
  try {
    const resp = await customFetchForAll("/taskEventForAll");

    const tasksAndEventsForALL = resp.data;
    return tasksAndEventsForALL;
  } catch (error) {
    console.error("Error loading tasks and events:", error.message);
  }
};

const UserDashboard = () => {
  const { handleImageUpload, uploading, profileImage } =
    useHandleImageUpload("user");

  const { data: data2 } = useQuery({
    queryKey: ["taskEventForAll"],
    queryFn: fetchEventsTasks
  });

  const tasksForAll = data2?.data?.tasks || [];
  const eventsForAll = data2?.data?.events || [];


  const { data, isLoading, error } = useUserData();

  const tasks = data?.tasks?.tasks || [];
  const events = data?.events?.events || [];
  const user = data?.user.user || {};
  const timeRecordData = data?.timeRecords?.data || [];
  const userName = user?.username || "User";

  const { pendingEvents, pendingTasks, completedEvents, completedTasks } =
    categorizeTasksAndEvents(tasks, events);

  const closeTaskOrEventPending = getClosestTaskEventsOfToday(
    pendingTasks,
    pendingEvents
  );

  const { notSignedUpEvents, notSignedUpTasks } = categorizeTasksAndEvents(
    tasksForAll,
    eventsForAll
  );

  //line chart

  const userPointsData = timeRecordData.map((item) => {
    return {
      createdAt: item.createdAt,
      totalPoints: item.pointsEarned
    };
  });

  const pointsHistory = timeRecordData?.map((record) => ({
    task: record.name,
    date: new Date(record.clockOut).toLocaleDateString(),
    points: record.pointsEarned
  }));

  const totalPoints = timeRecordData?.reduce(
    (sum, record) => sum + record.pointsEarned,
    0
  );

  const notSingupNotAttendedEventTask = [
    ...notSignedUpTasks,
    ...notSignedUpEvents
  ];

  const pendingEventTasks = [...pendingEvents, ...pendingTasks];

  if (isLoading) {
    <PageLoading />;
  }

  if (error) {
    return <PageError />;
  }

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-[76rem]">
        {/* Navigation Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 max-w-[79.5rem] mx-auto p-0">
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

        {/* Welcome section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body flex items-center flex-col">
            {uploading && <p>Uploading...</p>}

            {profileImage ? (
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4">
                <img
                  src={profileImage}
                  alt="user image"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4">
                <img
                  src={user.profileImage}
                  alt="user image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

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
              <TaskReminder pendingTask={closeTaskOrEventPending} />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <DonutChart
            completedTasks={completedTasks.length}
            pendingTasks={pendingTasks.length}
          />
          <LineChart userPointsData={userPointsData} />
          <BarChart timeRecordData={timeRecordData} />
          <PieChart
            tasks={completedTasks.length}
            events={completedEvents.length}
          />
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
            <div className="card-body flex flex-col justify-between h-[400px]">
              {" "}
              {/* Fixed height */}
              <div>
                <div className="flex items-center mb-3">
                  <FaTasks className="text-xl text-green-400 mr-2" />
                  <h2 className="card-title text-lg font-semibold text-white">
                    Pending Tasks/Events for Clock In
                  </h2>
                </div>
                <div className="space-y-4">
                  {pendingEventTasks?.length > 0 ? (
                    pendingEventTasks.slice(0, 2).map((item) => (
                      <div
                        key={item._id}
                        className="p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 flex justify-between items-center transition duration-200"
                      >
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-gray-400">
                            Date: {formatDate(item.date)}
                          </p>
                          <p className="text-gray-400">Points: {item.points}</p>
                        </div>
                        <Link
                          to="/clockInOut"
                          className="px-4 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                          Check Status
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center mt-4">
                      No pending tasks available.Please singup for task first
                    </p>
                  )}
                </div>
              </div>
              {pendingEventTasks.length > 0 ? (
                <div className="mt-4 text-center">
                  <Link
                    to={`/profile/${user._id}`}
                    className="px-4 py-2 inline-flex items-center justify-center bg-gray-700 text-green-400 border border-green-500 rounded-lg font-medium text-sm hover:bg-green-500 hover:text-gray-900 transition duration-300"
                  >
                    <FaArrowRight className="mr-2" />
                    View All pending Tasks or Events on your profile
                  </Link>
                </div>
              ) : (
                <div className="mt-4 text-center">
                  <Link
                    to={`/tasks`}
                    className="px-4 py-2 inline-flex items-center justify-center bg-gray-700 text-green-400 border border-green-500 rounded-lg font-medium text-sm hover:bg-green-500 hover:text-gray-900 transition duration-300"
                  >
                    <FaArrowRight className="mr-2" />
                    View all Tasks or Events for signup
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Available Tasks */}
          <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
            <div className="card-body flex flex-col justify-between h-[400px]">
              {" "}
              {/* Fixed height */}
              <div>
                <div className="flex items-center mb-3">
                  <FaClipboardList className="text-xl text-purple-400 mr-2" />
                  <h2 className="card-title text-lg font-semibold text-white">
                    Available Tasks/Events for Signup
                  </h2>
                </div>
                <div className="space-y-4">
                  {notSingupNotAttendedEventTask?.length > 0 ? (
                    notSingupNotAttendedEventTask.slice(0, 2).map((item) => (
                      <div
                        key={item._id}
                        className="p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 flex justify-between items-center transition duration-200"
                      >
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-gray-400">
                            Date: {formatDate(item.date)}
                          </p>
                          <p className="text-gray-400">Points: {item.points}</p>
                        </div>
                        <Link
                          to={`/tasks/${item._id}`}
                          className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                          Sign Up
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center mt-4">
                      No tasks available for signup. Check for pending tasks on
                      your profile.
                    </p>
                  )}
                </div>
              </div>
              {notSingupNotAttendedEventTask.length > 0 ? (
                <div className="mt-4 text-center">
                  <Link
                    to="/tasks"
                    className="px-4 py-2 inline-flex items-center justify-center bg-gray-700 text-purple-400 border border-purple-500 rounded-lg font-medium text-sm hover:bg-purple-500 hover:text-gray-900 transition duration-300"
                  >
                    <FaArrowRight className="mr-2" />
                    View All Available Tasks or Events
                  </Link>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
