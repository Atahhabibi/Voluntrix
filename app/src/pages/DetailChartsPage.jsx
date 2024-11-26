import React from "react";
import { useEffect } from "react";
import {
  FaFileExport,
  FaArrowLeft,
  FaBell,
  FaChartPie,
  FaTable,
  FaCalendarAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  EventOverviewTable,
  PointsDistributionTable,
  TaskOverviewTable,
  TopPerformingVolunteersTable,
  VolunteerTable
} from "../components";
import {
  TaskPointsDistribution,
  PointsEarnedByUsers,
  UserParticipationOverview,
  NewUsersOverTime,
  WeeklyEngagement,
  VolunteerAvailability,
  TimeSpentOnTasksAndEvents,
  TasksVsEventsParticipation,
  HoursWorkedByUsers,
  TaskCompletionStatus
} from "../charts";

const DetailChartsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Navigation Section */}
        <Link
          to="/adminDashboard"
          className="flex items-center justify-center w-48 py-2 mb-6 text-white rounded bg-blue-500 hover:bg-blue-600 transition"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>

        {/* Page Title and Subtitle */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Admin Insights and Tools
          </h1>
          <p className="text-gray-400 text-lg">
            Dive deeper into charts, data, and administrative features to manage
            your team effectively.
          </p>
        </div>

        {/* Announcements Section */}
        <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaBell className="text-yellow-400 mr-2" /> Announcements
          </h3>
          <p className="text-gray-400">No announcements at this time.</p>
        </div>

        {/* Charts Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaChartPie className="text-blue-400 mr-2" /> Key Performance Charts
          </h3>
          <p className="text-gray-400 mb-6">
            Visualize key metrics and gain actionable insights.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <TaskCompletionStatus />
            <TaskPointsDistribution />
            <PointsEarnedByUsers />
            <UserParticipationOverview />
            <NewUsersOverTime />
            <WeeklyEngagement />
            <VolunteerAvailability />
            <TimeSpentOnTasksAndEvents />
            <TasksVsEventsParticipation />
            <HoursWorkedByUsers />
          </div>
        </div>

        {/* Tables Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaTable className="text-green-400 mr-2" /> Data Tables Overview
          </h3>
          <p className="text-gray-400 mb-6">
            Review detailed insights about tasks, events, volunteers, and their
            performance. Use the navigation buttons at the bottom of each table
            to explore more data.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopPerformingVolunteersTable />
            <VolunteerTable />
            <TaskOverviewTable />
            <PointsDistributionTable />
          </div>
        </div>

        {/* Event Table */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaCalendarAlt className="text-yellow-400 mr-2" /> Event Overview
          </h3>
          <EventOverviewTable />
        </div>

        {/* Recent Activity Section */}
        <div className="mb-10 bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaBell className="text-blue-400 mr-2" /> Recent Activity
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>- Task X assigned to Volunteer A</li>
            <li>- Event Y updated by Admin</li>
            <li>- Volunteer B completed Task Z</li>
          </ul>
        </div>

        {/* Export Data Section */}
        <div className="flex justify-center">
          <button className="btn btn-secondary text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700">
            <FaFileExport className="mr-2" /> Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailChartsPage;
