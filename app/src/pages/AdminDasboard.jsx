import React from "react";
import {
  FaClock,
  FaStar,
  FaUserFriends,
  FaBell,
  FaChartPie,
  FaTable,
  FaTrophy
} from "react-icons/fa";
import { Link } from "react-router-dom";
import imamImg from "../images/imam.png";
import {
  EventAttendanceStatus,
  PointsEarnedByUsers,
  TaskPointsDistribution,
  UserParticipationOverview
} from "../charts";
import { PageError, PageLoading, TopPerformingVolunteersTable } from "../components";
import useAppData from "../util/CustomHooks/useAppData";
import { TaskCompletionOverview, UpcomingEventsTable } from "../tables";
import { calculatePointsAndHours } from "../util/dataHandlingFunctions";
import { getTopVolunteers } from "../util/dataHandlingFunctions";
import useUserData from "../util/customHooks/useUserData";
import useHandleImageUpload from "../util/handleImageUpload";
import { customFetch } from "../util/customFetch";
import { useQuery } from "@tanstack/react-query";

const fetchAdmin = async () => {
  try {
    const response = await customFetch("/admin");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const AdminDashboard = () => {
  const { data, isError, isLoading } = useAppData();
  const events = data?.events?.data || [];
  const tasks = data?.tasks?.data || [];
  const users = data?.users?.data || [];
  const allAdmins = data?.allAdmins?.allAdmins || [];
  const volunteers = data?.users?.data || [];
  const timeRecords = data?.volunteerTimeRecords?.data || [];

  const { data: data2 } = useQuery({
    queryKey: ['admin'],
    queryFn: fetchAdmin
  });

  const admin = data2?.admin;

  const adminName = admin?.username || "Sheikh Hamzah Khalid";

  const pointsAndHours = calculatePointsAndHours(tasks, events, timeRecords);
  const topVolunteer = getTopVolunteers(volunteers, 1);
  const volunteer = topVolunteer[0] || {};

  const { handleImageUpload, uploading, profileImage } =
    useHandleImageUpload("admin");

  if (isLoading) {
    return <PageLoading/>
  }
  if (isError) {
    return <PageError/>
  }

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-screen-xl">
        {/* Welcome Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700 max-w-[77rem] m-auto">
          <div className="card-body flex items-center flex-col">
            <div className="flex flex-col items-center">
              {uploading && <p>uploading....</p>}
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
                />
              ) : (
                <img
                  src={admin?.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
                />
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
            <FaTrophy className="text-4xl text-yellow-300 mr-4" />
            <div>
              <p className="text-xl font-semibold text-white">
                {volunteer.username}
              </p>
              <p className="text-gray-400">Top volunteers</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaStar className="text-4xl text-yellow-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {pointsAndHours.totalPointsDistributed}
              </p>
              <p className="text-gray-400">Points Distributed</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaUserFriends className="text-4xl text-green-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {volunteers?.length}
              </p>
              <p className="text-gray-400">Active Volunteers</p>
            </div>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow-md max-w-[77rem] m-auto">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-gray-200 border-collapse">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-3 border border-gray-700 w-[25%] text-center">
                    Date
                  </th>
                  <th className="px-6 py-3 border border-gray-700 hidden lg:table-cell text-center">
                    Title
                  </th>
                  <th className="px-6 py-3 border border-gray-700 text-center">
                    Announcement
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Announcement Row */}
                <tr className="bg-gray-800 hover:bg-gray-600 transition">
                  <td className="px-6 py-4 border border-gray-700 w-[25%]">
                    December 1, 2024
                  </td>
                  <td className="px-6 py-4 border border-gray-700 hidden lg:table-cell">
                    Monthly Data Review
                  </td>
                  <td className="px-6 py-4 border border-gray-700">
                    <span className="text-gray-400">
                      Please review the monthly reports for tasks and events by
                      December 5th. Ensure data accuracy before finalizing.
                    </span>
                  </td>
                </tr>
                {/* Announcement Row */}
                <tr className="bg-gray-800 hover:bg-gray-600 transition">
                  <td className="px-6 py-4 border border-gray-700 w-[25%]">
                    November 28, 2024
                  </td>
                  <td className="px-6 py-4 border border-gray-700 hidden lg:table-cell">
                    System Maintenance
                  </td>
                  <td className="px-6 py-4 border border-gray-700">
                    <span className="text-gray-400">
                      Scheduled system maintenance will occur on December 2nd
                      from 12:00 AM to 4:00 AM. Admin access may be limited
                      during this time.
                    </span>
                  </td>
                </tr>
                {/* Announcement Row */}
                <tr className="bg-gray-800 hover:bg-gray-600 transition">
                  <td className="px-6 py-4 border border-gray-700 w-[25%]">
                    November 25, 2024
                  </td>
                  <td className="px-6 py-4 border border-gray-700 hidden lg:table-cell">
                    Volunteer Feedback Review
                  </td>
                  <td className="px-6 py-4 border border-gray-700">
                    <span className="text-gray-400">
                      A meeting to discuss volunteer feedback and improvement
                      strategies is scheduled for December 6th at 3:00 PM.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* See More Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => (window.location.href = "/announcements")}
              className="btn btn-primary px-6 py-3 rounded-lg shadow-md text-white hover:bg-blue-600"
            >
              See More Announcements
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mb-10 bg-gray-800 p-6 rounded-lg shadow-md max-w-[77rem] m-auto">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaBell className="text-blue-400 mr-2" /> Recent Activity
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>- Task X assigned to Volunteer A</li>
            <li>- Event Y updated by Admin</li>
            <li>- Volunteer B completed Task Z</li>
          </ul>
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
            <EventAttendanceStatus
              events={events}
              isLoading={isLoading}
              isError={isError}
            />
            <TaskPointsDistribution
              tasks={tasks}
              isLoading={isLoading}
              isError={isError}
            />
            <PointsEarnedByUsers
              users={users}
              isLoading={isLoading}
              isError={isError}
            />
            <UserParticipationOverview
              allAdmins={allAdmins}
              volunteers={volunteers}
              isLoading={isLoading}
              isError={isError}
            />
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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 px-6">
            <TopPerformingVolunteersTable
              users={users}
              isError={isError}
              isLoading={isLoading}
            />

            <TaskCompletionOverview
              tasks={tasks}
              isLoading={isLoading}
              isError={isError}
            />
          </div>

          <div className=" px-6">
            <UpcomingEventsTable
              events={events}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
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
