import React, { useState, useEffect } from "react";
import {
  FaStop,
  FaPlay,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../util/customFetch";
import { getClosestPendingWithType } from "../util/dataHandlingFunctions";
import { Link } from "react-router-dom";
import getClosestTaskEventsOfToday from "../util/getClosestTaskEventsOfToday";
import categorizeTasksAndEvents from "./../util/categorizeTasksAndEvents";

const fetchTasksAndEvents = async () => {
  const response = await customFetch("/tasks-events");
  if (!response.data?.success) {
    throw new Error("Failed to fetch tasks and events.");
  }
  return response.data;
};

const fetchTimeRecords = async () => {
  const response = await customFetch("/time-records");
  if (!response.data?.success) {
    throw new Error("Failed to fetch time records.");
  }
  return response.data.data;
};

const TaskTrackingPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [trackedItem, setTrackedItem] = useState(
    JSON.parse(localStorage.getItem("trackedItem")) || null
  );
  const [clockInTime, setClockInTime] = useState(
    JSON.parse(localStorage.getItem("clockInTime")) || null
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("trackedItem", JSON.stringify(trackedItem));
    localStorage.setItem("clockInTime", JSON.stringify(clockInTime));
  }, [trackedItem, clockInTime]);

  const {
    data: tasksEventsData,
    isLoading: taskEventLoading,
    isError: taskEventError
  } = useQuery({
    queryKey: ["TasksEvents"],
    queryFn: fetchTasksAndEvents,
    retry: 1
  });

  const {
    data: timeRecords = [],
    isLoading: timeRecordLoading,
    isError: timeRecordError
  } = useQuery({
    queryKey: ["TimeRecords"],
    queryFn: fetchTimeRecords,
    retry: 1,
    onError: (error) => {
      toast.error(error.message || "Failed to fetch time records.");
    }
  });

  const recordMutation = useMutation({
    mutationFn: async (record) => {
      const response = await customFetch.post("/time-records", record);
      if (!response.data?.success) {
        throw new Error("Failed to save time record.");
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Time record saved successfully!");
      queryClient.invalidateQueries(["TasksEvents"]);
      queryClient.invalidateQueries(["TimeRecords"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save time record.");
    }
  });

  const tasks = tasksEventsData?.tasks || [];
  const events = tasksEventsData?.events || [];

  const { pendingEvents, pendingTasks } = categorizeTasksAndEvents(
    tasks,
    events
  );

  const closeTaskOrEventPending = getClosestTaskEventsOfToday(
    pendingTasks,
    pendingEvents
  );

  console.log(closeTaskOrEventPending);

  const recordsPerPage = 5;
  const totalRecords = timeRecords.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = timeRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handleClockIn = (item) => {
    if (trackedItem) {
      toast.error("Please clock out of the current task or event first.");
      return;
    }
    setTrackedItem(item);
    setClockInTime(Date.now());
    toast.success(`You have clocked in for: "${item.item.name}"`);
  };

  const handleClockOut = () => {
    if (!trackedItem) {
      toast.error("Nothing is currently being tracked.");
      return;
    }
    const clockOutTime = Date.now();
    const timeSpentInSeconds = Math.floor((clockOutTime - clockInTime) / 1000);
    const pointsEarned = calculatePoints(timeSpentInSeconds);

    const record = {
      id: trackedItem.item._id,
      name: trackedItem.item.name,
      clockIn: new Date(clockInTime).toISOString(),
      clockOut: new Date(clockOutTime).toISOString(),
      timeSpent: timeSpentInSeconds,
      pointsEarned,
      itemType: trackedItem.type
    };

    recordMutation.mutate(record);
    setTrackedItem(null);
    setClockInTime(null);
    localStorage.removeItem("trackedItem");
    localStorage.removeItem("clockInTime");
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

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (taskEventLoading || timeRecordLoading) return <p>Loading...</p>;
  if (taskEventError || timeRecordError) return <p>Error loading data.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      {/* Back to Dashboard Button */}
      <Link
        to="/userDashboard"
        className="flex items-center justify-center w-48 py-2 mb-6 text-white  rounded bg-blue-500 hover:bg-blue-600 transition"
      >
        <FaArrowLeft className="mr-2" />
        Back to Dashboard
      </Link>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Clock In and Out
        </h1>
        <div className="w-full max-w-[25rem] h-54 grid m-auto bg-gray-800 rounded-lg shadow">
          {closeTaskOrEventPending === null ? (
            <p className="text-white  text-lg py-4 px-6 text-center">
              No tasks or events to clock in For today check your schedule.
            </p>
          ) : (
            <div
              key={closeTaskOrEventPending?.item?._id}
              className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-lg hover:bg-gray-700 transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">
                  {closeTaskOrEventPending?.item?.name || "No Name"}
                </h3>
                <span className="text-sm text-green-400 bg-green-900 px-2 py-1 rounded-full">
                  {closeTaskOrEventPending?.item?.points || 0} Points
                </span>
              </div>
              <div className="text-gray-400 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-400" />
                  <span>
                    {closeTaskOrEventPending?.item?.date?.split("T")[0] ||
                      "No date provided"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <FaClock className="text-yellow-400" />
                  <span>
                    {closeTaskOrEventPending?.item?.time || "No time provided"}
                  </span>
                </div>
              </div>
              {trackedItem?.item?._id === closeTaskOrEventPending?.item?._id ? (
                <button
                  onClick={handleClockOut}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <FaStop className="inline mr-2" /> Clock Out
                </button>
              ) : (
                <button
                  onClick={() => handleClockIn(closeTaskOrEventPending)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <FaPlay className="inline mr-2" /> Clock In
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col min-h-[20rem]">
          <h2 className="text-xl font-semibold mb-4">Time Records</h2>
          <div className="flex-grow">
            <table className="table-auto w-full bg-gray-800 text-gray-200 rounded-lg shadow-md text-sm border-collapse border border-gray-700 min-h-[10rem]">
              <thead>
                <tr className="bg-gray-700 text-center">
                  <th className="px-4 py-2 border border-gray-700">Name</th>
                  <th className="px-4 py-2 border border-gray-700">Clock In</th>
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
                      {record.name}
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
                {currentRecords.length < recordsPerPage &&
                  Array.from(
                    { length: recordsPerPage - currentRecords.length },
                    (_, index) => (
                      <tr
                        key={`empty-${index}`}
                        className="border-t border-gray-700 text-center"
                      >
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default TaskTrackingPage;
