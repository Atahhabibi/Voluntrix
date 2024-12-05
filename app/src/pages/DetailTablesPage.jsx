import React from "react";
import {
  FaTable,
  FaCalendarAlt,
  FaUsers,
  FaTasks,
  FaTrophy,
  FaFileExport
} from "react-icons/fa";
import {
  TopPerformingVolunteersTable,
  VolunteerTable,
  TaskOverviewTable,
  PointsDistributionTable,
  EventOverviewTable
} from "../components";
import useAppData from "../util/CustomHooks/useAppData";

const DetailTablesPage = () => {
  const { data, isError, isLoading } = useAppData();
  const events = data?.events?.data || [];
  const tasks = data?.tasks?.data || [];
  const users = data?.users?.data || [];
  const volunteers = data?.users?.data || [];
  const timeRecords = data?.volunteerTimeRecords?.data;

  return (
    <div className="flex justify-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="w-full max-w-screen-xl mt-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Volunteer and Event Insights
          </h1>
          <p className="text-lg text-gray-400">
            Track and analyze volunteer performance, event metrics, and task
            completion. Use this dashboard to manage your resources effectively.
          </p>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-[76rem] m-auto">
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaUsers className="text-4xl text-blue-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {volunteers.length}
              </p>
              <p className="text-gray-400">Total Volunteers</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaTasks className="text-4xl text-yellow-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {tasks.length}
              </p>
              <p className="text-gray-400">Tasks Completed</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaTrophy className="text-4xl text-green-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {users.filter((user) => user.isTopPerformer).length}
              </p>
              <p className="text-gray-400">Top Performers</p>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white flex items-center mb-4 px-6">
            <FaTable className="text-blue-400 mr-2" /> Volunteer and Task Tables
          </h3>
          <p className="text-gray-400 mb-6 px-6">
            Analyze detailed data on volunteer performance, task distribution,
            and overall points earned.
          </p>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <TopPerformingVolunteersTable
              users={users}
              isError={isError}
              isLoading={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 mt-8">
            <TaskOverviewTable
              tasks={tasks}
              isError={isError}
              isLoading={isLoading}
            />
            <PointsDistributionTable
              events={events}
              tasks={tasks}
              users={users}
              isError={isError}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Event Table Section */}
        <div className="mb-10 px-6">
          <h3 className="text-xl font-bold text-white flex items-center mb-4">
            <FaCalendarAlt className="text-yellow-400 mr-2" /> Event Overview
          </h3>
          <p className="text-gray-400 mb-6">
            Gain insights into event participation and performance metrics.
          </p>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <EventOverviewTable
              events={events}
              isError={isError}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Export Data Section */}
        <div className="flex justify-center mb-8">
          <button className="btn btn-secondary text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition">
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

export default DetailTablesPage;
