import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaStar,
  FaTasks,
  FaCalendarAlt,
  FaEnvelope,
  FaUserCircle,
  FaEdit,
  FaArrowLeft,
  FaTrashAlt
} from "react-icons/fa";
import { useLoaderData, Link } from "react-router-dom";
import useUserData from "../util/useUserData";
import ProfileTableData from "../components/ProfileDataTable";
import { BarChart, PieChart } from "../charts";
import { customFetch } from "../util/customFetch";

export const loader = async ({ params }) => {
  return useUserData({ params });
};

function convertSecondsToHours(seconds) {
  if (typeof seconds !== "number" || seconds < 0) {
    throw new Error("Input must be a non-negative number.");
  }
  const hours = seconds / 3600;
  return hours.toFixed(2);
}

const VolunteerProfilePage = () => {
  const { tasks, user: volunteer, events, timeRecordData } = useLoaderData();

  // Assigned and completed tasks/events state
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [assignedEvents, setAssignedEvents] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  // Set state on component mount
  useEffect(() => {
    setCompletedTasks(tasks.filter((item) => item.status === "completed"));
    setCompletedEvents(events.filter((item) => item.status === "completed"));
    setAssignedTasks(tasks.filter((item) => item.status !== "completed"));
    setAssignedEvents(events.filter((item) => item.status !== "completed"));
  }, [tasks, events]);

  // Delete handlers
  const handleDeleteTask = async (taskId) => {
    try {
      await customFetch.delete(`/tasks/${taskId}`); // Adjust endpoint to match your backend
      setAssignedTasks(assignedTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await customFetch.delete(`/events/${eventId}`); // Adjust endpoint to match your backend
      setAssignedEvents(
        assignedEvents.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
        {/* Navigation Section */}
        <Link
          to="/userDashboard"
          className="flex items-center justify-center w-48 py-2 mb-6 text-white rounded bg-blue-500 hover:bg-blue-600 transition"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>

        {/* Profile Section */}
        <div className="card w-full bg-gray-800 shadow-lg mb-6 border border-gray-700">
          <div className="card-body flex flex-col items-center">
            <img
              src={volunteer?.profileImage}
              alt={`${volunteer.username}'s profile`}
              className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
            />
            <h2 className="text-3xl font-bold text-white mb-2">
              {volunteer?.username}
            </h2>
            <div className="text-gray-400 space-y-1 mb-4">
              <p className="flex items-center text-lg">
                <FaEnvelope className="text-blue-400 mr-2" />
                {volunteer?.email}
              </p>
              <p className="flex items-center text-lg justify-center">
                <FaUserCircle className="text-green-400 mr-2" />
                Role: {volunteer?.role}
              </p>
            </div>

            {volunteer.role === "volunteer" && (
              <Link
                className="btn btn-outline btn-primary flex items-center"
                to={`/editProfile/${volunteer?._id}`}
              >
                <FaEdit className="mr-2" /> Edit Profile
              </Link>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <SummaryCard
            icon={<FaClock className="text-5xl text-blue-400" />}
            value={convertSecondsToHours(volunteer.hoursWorked)}
            label="Hours Worked"
          />
          <SummaryCard
            icon={<FaStar className="text-5xl text-yellow-400" />}
            value={volunteer.totalPoints}
            label="Points Earned"
          />
          <SummaryCard
            icon={<FaTasks className="text-5xl text-green-400" />}
            value={completedTasks.length}
            label="Tasks Completed"
          />
          <SummaryCard
            icon={<FaCalendarAlt className="text-5xl text-green-400" />}
            value={completedEvents.length}
            label="Events Attended"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <PieChart
            tasks={completedTasks.length}
            events={completedEvents.length}
          />
          <BarChart timeRecordData={timeRecordData} />
        </div>

        {/* Tables for Tasks and Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileTableData
            title="Assigned Tasks"
            data={assignedTasks}
            onDelete={handleDeleteTask}
          />
          <ProfileTableData
            title="Assigned Events"
            data={assignedEvents}
            onDelete={handleDeleteEvent}
          />
          <ProfileTableData title="Tasks Completed" data={completedTasks} />
          <ProfileTableData title="Events Completed" data={completedEvents} />
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, value, label }) => (
  <div className="flex items-center justify-center gap-5 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
    {icon}
    <div>
      <p className="text-3xl font-semibold text-white">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  </div>
);

export default VolunteerProfilePage;
