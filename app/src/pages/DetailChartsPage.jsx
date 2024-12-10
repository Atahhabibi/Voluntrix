import React, { useEffect } from "react";
import { FaFileExport, FaChartPie } from "react-icons/fa";
import { PageLoading, PageError } from "../components";

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
  EventAttendanceStatus,
} from "../charts";
import useAppData from "../util/CustomHooks/useAppData";
import { exportDataAsCSV, tempData } from "../util/dataHandlingFunctions";

const DetailChartsPage = () => {
  const { data, isError, isLoading } = useAppData();
  const events = data?.events?.data || [];
  const tasks = data?.tasks?.data || [];
  const users = data?.users?.data || [];
  const allAdmins = data?.allAdmins?.allAdmins || [];
  const volunteers = data?.users?.data || [];
  const timeRecords = data?.volunteerTimeRecords?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }
  if (isError) {
    return <PageError />;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-4 sm:p-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Page Title and Subtitle */}
        <div className="mb-6 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Admin Insights and Tools
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
            Dive deeper into charts, data, and administrative features to manage
            your team effectively.
          </p>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center justify-center">
            <FaChartPie className="text-blue-400 mr-2" /> Key Performance Charts
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-4 text-center">
            Visualize key metrics and gain actionable insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <WeeklyEngagement
              timeRecords={timeRecords}
              isLoading={isLoading}
              isError={isError}
            />
            <TimeSpentOnTasksAndEvents
              timeRecords={timeRecords}
              isLoading={isLoading}
              isError={isError}
            />
            <NewUsersOverTime
              users={users}
              isLoading={isLoading}
              isError={isError}
            />
            <TasksVsEventsParticipation
              timeRecords={timeRecords}
              isLoading={isLoading}
              isError={isError}
            />
            <VolunteerAvailability
              tasks={tasks}
              isLoading={isLoading}
              isError={isError}
            />
            <PointsEarnedByUsers
              users={users}
              isLoading={isLoading}
              isError={isError}
            />
            <HoursWorkedByUsers
              users={users}
              isLoading={isLoading}
              isError={isError}
            />
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
            <UserParticipationOverview
              allAdmins={allAdmins}
              volunteers={volunteers}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
        {/* Export Data Section */}
        <div className="flex justify-center mb-6">
          <button
            className="btn btn-secondary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-gray-700"
            onClick={() => exportDataAsCSV(tempData)}
          >
            <FaFileExport className="mr-2" /> Export Data
          </button>
        </div>

        {/* Footer Section */}
        <div className="flex justify-center">
          <p className="text-gray-400 text-center text-sm sm:text-base">
            Data updated in real-time for accurate tracking and reporting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailChartsPage;
