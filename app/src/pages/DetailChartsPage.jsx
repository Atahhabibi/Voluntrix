import React from "react";
import { useEffect } from "react";
import { FaFileExport, FaBell, FaChartPie } from "react-icons/fa";

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
      <div className="max-w-screen-xl mx-auto mt-8">
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

   

        {/* Export Data Section */}
        <div className="flex justify-center mb-8">
          <button className="btn btn-secondary text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700">
            <FaFileExport className="mr-2" /> Export Data
          </button>
        </div>

        {/* Footer Section */}
        <div className="flex justify-center">
          <p className="text-gray-400 text-center">
            Data updated in real-time for accurate tracking and reporting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailChartsPage;
