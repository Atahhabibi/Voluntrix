import React from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaTasks,
  FaFileExport,
  FaClock
} from "react-icons/fa";
import {
  PageError,
  PageLoading,
  TopPerformingVolunteersTable
} from "../components";
import useAppData from "../util/CustomHooks/useAppData";
import {
  EventPerformanceTable,
  EventTimeTracker,
  HighPointsTasksTable,
  TaskCompletionOverview,
  TaskTimeSummary,
  UpcomingEventsTable,
  UserRolesTable,
  UserTimeLog,
  VolunteerEventsTable,
  VolunteerNeedsTable,
  VolunteerParticipationTable,
  VolunteerTasksTable
} from "../tables";

const DetailTablesPage = () => {
  const { data, isError, isLoading } = useAppData();
  const events = data?.events?.data || [];
  const tasks = data?.tasks?.data || [];
  const users = data?.users?.data || [];
  const volunteers = data?.users?.data || [];
  const timeRecords = data?.volunteerTimeRecords?.data || [];

  if (isLoading) {
    return <PageLoading />;
  }
  if (isError) {
    return <PageError />;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="max-w-screen-xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Volunteer and Event Insights
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400">
            Monitor volunteer performance, event success, and task metrics with
            real-time insights.
          </p>
        </div>

        {/* Volunteer Overview */}
        <div className="mb-12">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center mb-4">
            <FaUsers className="text-blue-400 mr-3" /> Volunteer Insights
          </h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Explore volunteer performance, participation rates, and task
            contributions.
          </p>
          <TopPerformingVolunteersTable
            users={users}
            isError={isError}
            isLoading={isLoading}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <VolunteerEventsTable
              users={users}
              isError={isError}
              isLoading={isLoading}
            />
            <VolunteerTasksTable
              users={users}
              isError={isError}
              isLoading={isLoading}
            />
          </div>
          <UserRolesTable
            users={users}
            isError={isError}
            isLoading={isLoading}
          />
        </div>

        {/* Task Overview */}
        <div className="mb-12">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center mb-4">
            <FaTasks className="text-yellow-400 mr-3" /> Task Analysis
          </h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Evaluate task distribution, high-point tasks, and completion
            metrics.
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <HighPointsTasksTable
              tasks={tasks}
              isLoading={isLoading}
              isError={isError}
            />
            <TaskCompletionOverview
              tasks={tasks}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
          <VolunteerParticipationTable
            tasks={tasks}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        {/* Event Overview */}
        <div className="mb-12">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center mb-4">
            <FaCalendarAlt className="text-green-400 mr-3" /> Event Insights
          </h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Track participation and performance metrics for upcoming and past
            events.
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <EventPerformanceTable
              events={events}
              isLoading={isLoading}
              isError={isError}
            />
            <VolunteerNeedsTable
              events={events}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
          <UpcomingEventsTable
            events={events}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        {/* Time Records Overview */}
        <div className="mb-12">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center mb-4">
            <FaClock className="text-purple-400 mr-3" /> Time Tracking
          </h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Analyze clock-in and clock-out records for better time management.
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TaskTimeSummary
              isLoading={isLoading}
              isError={isError}
              timeRecords={timeRecords}
            />
            <EventTimeTracker
              isLoading={isLoading}
              isError={isError}
              timeRecords={timeRecords}
            />
          </div>
          <UserTimeLog
            isLoading={isLoading}
            isError={isError}
            timeRecords={timeRecords}
          />
        </div>

        {/* Export Data Section */}
        <div className="flex justify-center mb-12">
          <button className="btn btn-secondary bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition">
            <FaFileExport className="mr-2" /> Export Data
          </button>
        </div>

        {/* Footer Section */}
        <div className="flex justify-center">
          <p className="text-sm sm:text-base text-gray-400 text-center">
            Data updated in real-time for accurate tracking and reporting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailTablesPage;
