import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaCheck,
  FaTasks,
  FaCalendarAlt,
  FaUserFriends,
  FaExclamationTriangle
} from "react-icons/fa"; // Ensure necessary icons are imported

// Sample tasks data
const tasks = [
  {
    id: 1,
    name: "Parking Assistance",
    date: "2024-11-14",
    time: "10:00 AM",
    volunteersNeeded: 5,
    points: 10,
    type: "crowd control"
  },
  {
    id: 2,
    name: "Prayer Hall Setup",
    date: "2024-11-14",
    time: "9:00 AM",
    volunteersNeeded: 3,
    points: 15,
    type: "setup"
  },
  {
    id: 3,
    name: "Clean-Up",
    date: "2024-11-14",
    time: "4:00 PM",
    volunteersNeeded: 4,
    points: 8,
    type: "clean-up"
  }
];

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="clock">
      <div
        className="hour_hand"
        style={{
          transform: `rotateZ(${time.getHours() * 30}deg)`
        }}
      />
      <div
        className="min_hand"
        style={{
          transform: `rotateZ(${time.getMinutes() * 6}deg)`
        }}
      />
      <div
        className="sec_hand"
        style={{
          transform: `rotateZ(${time.getSeconds() * 6}deg)`
        }}
      />
      <span className="twelve">12</span>
      <span className="one">1</span>
      <span className="two">2</span>
      <span className="three">3</span>
      <span className="four">4</span>
      <span className="five">5</span>
      <span className="six">6</span>
      <span className="seven">7</span>
      <span className="eight">8</span>
      <span className="nine">9</span>
      <span className="ten">10</span>
      <span className="eleven">11</span>
    </div>
  );
};

const ClockInPage = () => {
  const [clockedInTask, setClockedInTask] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [warningMessage, setWarningMessage] = useState(null);
  const [userName, setUserName] = useState("John Doe");

  const today = new Date().toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'

  const todayTasks = tasks.filter((task) => task.date === today);

  const handleClockIn = (task) => {
    if (task.date !== today) {
      setWarningMessage("You cannot clock in for future tasks.");
      return;
    }

    const currentTime = new Date();
    setClockedInTask(task);
    setClockInTime(currentTime);
    setClockOutTime(null);
    setWarningMessage(null);
  };

  const handleClockOut = () => {
    const currentTime = new Date();
    setClockOutTime(currentTime);
    const timeSpent = Math.floor((currentTime - clockInTime) / 60000); // Calculate minutes
    setTotalTime(timeSpent);
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    let timer;
    if (clockInTime && !clockOutTime) {
      timer = setInterval(() => {
        setTotalTime(Math.floor((new Date() - clockInTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [clockInTime, clockOutTime]);

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-300 flex justify-center items-center gap-2">
            <FaUserFriends /> Welcome, {userName}
          </h1>
          <h2 className="text-2xl mt-2 text-gray-300">
            Clock In & Out for Tasks
          </h2>
          <p className="text-lg mt-4 text-gray-300">
            Manage your volunteering tasks by clocking in and out!
          </p>
        </section>

        {/* Analog Clock Section */}
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Current Time
          </h2>
          <Clock /> {/* Display the analog clock */}
        </section>

        {/* Today's Task Section */}
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Today's Task
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {todayTasks.length === 0 ? (
              <p className="text-lg text-red-500">
                No tasks available for today.
              </p>
            ) : (
              todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="card bg-base-300 shadow-lg p-6 border border-base-100 transition transform hover:shadow-2xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    <FaTasks /> {task.name}
                  </h3>
                  <div className="text-gray-300 space-y-2">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-yellow-400" />
                      <span>Date: {task.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaClock className="text-blue-400" />
                      <span>Time: {task.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaUserFriends className="text-green-400" />
                      <span>Volunteers Needed: {task.volunteersNeeded}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheck className="text-purple-400" />
                      <span>Points: {task.points}</span>
                    </p>
                  </div>

                  {/* Clock In / Clock Out Buttons */}
                  {clockedInTask?.id === task.id ? (
                    <div>
                      <button
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={handleClockOut}
                      >
                        <FaCheck /> Clock Out
                      </button>
                      {clockOutTime && (
                        <div className="mt-2 text-white">
                          <p>Time Spent: {formatTime(totalTime)}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                      onClick={() => handleClockIn(task)}
                    >
                      <FaClock /> Clock In
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Clock In/Out Section */}
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Clock In/Out Timer
          </h2>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => handleClockIn(todayTasks[0])}
              className="bg-blue-500 text-white p-6 rounded-full text-4xl flex items-center justify-center hover:bg-blue-600"
            >
              <FaClock />
            </button>
            {clockInTime && !clockOutTime && (
              <div className="text-white text-xl">
                <p>Running Time: {formatTime(totalTime)}</p>
              </div>
            )}
          </div>
        </section>

        {/* Warning Message */}
        {warningMessage && (
          <div className="bg-yellow-500 text-white p-4 rounded-md mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-2xl" />
            <span>{warningMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClockInPage;
