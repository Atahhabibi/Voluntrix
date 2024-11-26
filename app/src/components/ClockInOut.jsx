import React, { useState, useEffect} from "react";
import { FaStop, FaPlay, FaCalendarAlt, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../util/customFetch";
import useUserData from "../util/useUserData";


export const loader = async () => {
  return useUserData();
};

const fetchTimeRecords = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found, please log in again.");
  }

  const response = await customFetch("/time-records", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.data?.success) {
    throw new Error("Failed to fetch time records.");
  }

  return response.data.data;
};

const TaskTrackingPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { tasks, user, events } = useLoaderData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [trackedTask, setTrackedTask] = useState(null);
  const [trackedEvent, setTrackedEvent] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [totalPoints, setTotalPoints] = useState(user.totalPoints);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const {
    data: timeRecords = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["timeRecords"],
    queryFn: fetchTimeRecords,
    retry: 1,
    onError: (error) => {
      toast.error(error.message || "Failed to fetch time records.");
    }
  });

  const recordMutation = useMutation({
    mutationFn: async (record) => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No token found, please log in again.");
      }

      const response = await customFetch.post("/time-records", record, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data?.success) {
        throw new Error("Failed to save time record.");
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Time record saved successfully!");
      queryClient.invalidateQueries(["timeRecords"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save time record.");
    }
  });

  const handleClockIn = (item, type) => {
    if (trackedTask || trackedEvent) {
      toast.error("Please clock out of the current task or event first");
      return;
    }

    if (type === "task") {
      setTrackedTask(item);
      toast.success(`You have clocked in for the task: "${item.name}"`);
    } else if (type === "event") {
      setTrackedEvent(item);
      toast.success(`You have clocked in for the event: "${item.name}"`);
    } else {
      toast.error("Invalid clock-in type.");
      return;
    }

    setClockInTime(Date.now());
  };

  const handleClockOut = () => {
    if (!trackedTask && !trackedEvent) {
      toast.error("Nothing is currently being tracked.");
      return;
    }

    const clockOutTime = Date.now();
    const timeSpentInSeconds = Math.floor((clockOutTime - clockInTime) / 1000);
    const pointsEarned = calculatePoints(timeSpentInSeconds);

    let record;
    let itemType;

    if (trackedTask) {
      record = {
        id: trackedTask._id,
        name: trackedTask.name,
        clockIn: new Date(clockInTime).toISOString(),
        clockOut: new Date(clockOutTime).toISOString(),
        timeSpent: timeSpentInSeconds,
        pointsEarned
      };
      itemType = "task";
      toast.success(
        `Clocked out of the task: "${trackedTask.name}" and earned ${pointsEarned} points.`
      );
    } else if (trackedEvent) {
      record = {
        id: trackedEvent._id,
        name: trackedEvent.name,
        clockIn: new Date(clockInTime).toISOString(),
        clockOut: new Date(clockOutTime).toISOString(),
        timeSpent: timeSpentInSeconds,
        pointsEarned
      };
      itemType = "event";
      toast.success(
        `Clocked out of the event: "${trackedEvent.name}" and earned ${pointsEarned} points.`
      );
    }

    // Submit the record for mutation
    recordMutation.mutate({ ...record, itemType });

    // Reset tracking
    setTrackedTask(null);
    setTrackedEvent(null);
    setClockInTime(null);

    // Update total points
    setTotalPoints((prev) => prev + pointsEarned);
  };

  const calculatePoints = (timeSpentInSeconds) => {
    if (timeSpentInSeconds < 900) return 5;
    if (timeSpentInSeconds < 1800) return 10;
    if (timeSpentInSeconds < 3600) return 15;
    return 25;
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  const formatElapsedTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const totalRecords = timeRecords.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = timeRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching records.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-6 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <button
          onClick={() => navigate("/userDashboard")}
          className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Back to Dashboard
        </button>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Clock In and Out
          </h1>
          <p className="text-sm md:text-lg text-gray-400">
            Track your time, stay productive, and earn points for your tasks!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title for Tasks */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Tasks</h2>
          </div>

          {/* Render tasks */}
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">{task.name}</h3>
                <span className="text-sm text-green-400 bg-green-900 px-2 py-1 rounded-full">
                  {task.points} Points
                </span>
              </div>
              <div className="text-gray-400 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-400" />
                  <span>{task.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <FaClock className="text-yellow-400" />
                  <span>{task.time}</span>
                </div>
              </div>
              {trackedTask?._id === task._id ? (
                <button
                  onClick={handleClockOut}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
                >
                  <FaStop className="inline mr-2" /> Clock Out
                </button>
              ) : (
                <button
                  onClick={() => handleClockIn(task, "task")}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  <FaPlay className="inline mr-2" /> Clock In
                </button>
              )}
            </div>
          ))}

          {/* Title for Events */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Events</h2>
          </div>

          {/* Render events */}
          {events.map((event) => (
            <div
              key={event._id}
              className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">{event.name}</h3>
                <span className="text-sm text-green-400 bg-green-900 px-2 py-1 rounded-full">
                  {event.points} Points
                </span>
              </div>
              <div className="text-gray-400 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <FaClock className="text-yellow-400" />
                  <span>{event.time}</span>
                </div>
              </div>
              {trackedEvent?._id === event._id ? (
                <button
                  onClick={handleClockOut}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
                >
                  <FaStop className="inline mr-2" /> Clock Out
                </button>
              ) : (
                <button
                  onClick={() => handleClockIn(event, "event")}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  <FaPlay className="inline mr-2" /> Clock In
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Time Records</h2>
          <h3 className="text-lg font-semibold text-white mb-4">
            Total Points: {totalPoints}
          </h3>
          {currentRecords.length === 0 ? (
            <p className="text-gray-400">No records available.</p>
          ) : (
            <>
              <table className="table-auto w-full bg-gray-800 text-gray-200 rounded-lg shadow-md text-sm border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-700 text-center">
                    <th className="px-4 py-2 border border-gray-700">
                      Task Name
                    </th>
                    <th className="px-4 py-2 border border-gray-700">
                      Clock In
                    </th>
                    <th className="px-4 py-2 border border-gray-700">
                      Clock Out
                    </th>
                    <th className="px-4 py-2 border border-gray-700">
                      Time Spent
                    </th>
                    <th className="px-4 py-2 border border-gray-700">
                      Points Earned
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-700 hover:bg-gray-700 transition text-center"
                    >
                      <td className="px-4 py-2 border border-gray-700">
                        {record.taskName}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {formatTime(record.clockIn)}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {formatTime(record.clockOut)}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {formatElapsedTime(record.timeSpent)}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {record.pointsEarned}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                >
                  Previous
                </button>
                <p className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskTrackingPage;
