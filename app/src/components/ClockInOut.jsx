import React, { useState, useEffect } from "react";
import {
  FaStop,
  FaPlay,
  FaClock,
  FaCalendarAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaHourglassHalf
} from "react-icons/fa";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tasks = [
  {
    id: 1,
    name: "Parking Assistance",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    points: 10,
    type: "Crowd Control"
  },
  {
    id: 2,
    name: "Prayer Hall Setup",
    date: new Date().toISOString().split("T")[0],
    time: "9:00 AM",
    points: 15,
    type: "Setup"
  }
];

const TaskTrackingPage = () => {
  const [trackedTask, setTrackedTask] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeRecords, setTimeRecords] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [modalTask, setModalTask] = useState(null);

  const sortedTasks = tasks.sort(
    (a, b) =>
      new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`)
  );

  useEffect(() => {
    let interval;
    if (clockInTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((new Date() - clockInTime) / 1000));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [clockInTime]);

  const notify = (message, type = "info") => {
    toast.dismiss();
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const handleOpenModal = (type, task) => {
    if (type === "clock-in" && trackedTask) {
      notify(
        "Please clock out of the current task before clocking into another.",
        "error"
      );
      return;
    }
    setModalType(type);
    setModalTask(task);
  };

  const handleConfirmAction = () => {
    if (modalType === "clock-in") {
      setTrackedTask(modalTask);
      setClockInTime(new Date());
      setTimeElapsed(0);
      notify(`You have clocked in for "${modalTask.name}".`, "success");
    } else if (modalType === "clock-out") {
      const currentTime = new Date();
      const timeSpent = Math.floor((currentTime - clockInTime) / 60000);
      const taskRecord = {
        task: trackedTask.name,
        timeSpent,
        clockIn: formatTime(clockInTime),
        clockOut: formatTime(currentTime)
      };

      setTimeRecords((prevRecords) => [...prevRecords, taskRecord]);
      setTrackedTask(null);
      setClockInTime(null);
      setTimeElapsed(0);
      notify(`You have clocked out of "${modalTask.name}".`, "success");
    }
    closeModal();
  };

  const closeModal = () => {
    setModalType(null);
    setModalTask(null);
  };

  const formatElapsedTime = (timeInSeconds) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  const formatTimeSpent = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours} hrs ${minutes} mins`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-6 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex justify-center items-center gap-2">
            <FaClock /> Clock In and Out
          </h1>
          <p className="text-sm md:text-lg text-gray-400">
            Track your time, stay productive, and earn points for your tasks!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                {task.name}
              </h3>
              <p className="text-gray-400 flex items-center gap-2 text-sm">
                <FaCalendarAlt /> {task.date}
              </p>
              <p className="text-gray-400 flex items-center gap-2 text-sm">
                <FaClock /> {task.time}
              </p>
              <div
                className={`text-green-400 text-sm mt-2 ${
                  trackedTask?.id === task.id ? "visible" : "invisible"
                }`}
              >
                {trackedTask?.id === task.id
                  ? `Running Time: ${formatElapsedTime(timeElapsed)}`
                  : "Click Clock In to start timer"}
              </div>
              {trackedTask?.id === task.id ? (
                <button
                  onClick={() => handleOpenModal("clock-out", task)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
                >
                  <FaStop className="inline mr-2" /> Clock Out
                </button>
              ) : (
                <button
                  onClick={() => handleOpenModal("clock-in", task)}
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
          {timeRecords.length === 0 ? (
            <p className="text-gray-400">No records available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-gray-800 text-gray-200 rounded-lg shadow-md text-sm">
                <thead>
                  <tr className="bg-gray-700 text-left">
                    <th className="px-4 py-2">Task Name</th>
                    <th className="px-4 py-2">Clock In</th>
                    <th className="px-4 py-2">Clock Out</th>
                    <th className="px-4 py-2">Time Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {timeRecords.map((record, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-700 hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-2">{record.task}</td>
                      <td className="px-4 py-2">{record.clockIn}</td>
                      <td className="px-4 py-2">{record.clockOut}</td>
                      <td className="px-4 py-2">
                        {formatTimeSpent(record.timeSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {modalType && modalTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center w-full max-w-md">
              <h3 className="text-lg font-bold text-white mb-4">
                {modalType === "clock-in"
                  ? `Confirm Clock In for "${modalTask.name}"?`
                  : `Confirm Clock Out for "${modalTask.name}"?`}
              </h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleConfirmAction}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Confirm
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskTrackingPage;
