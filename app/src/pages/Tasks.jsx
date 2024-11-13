import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calenderStyles.css"; // Add custom styles here

// Sample data for tasks
const tasks = [
  {
    id: 1,
    name: "Parking Assistance",
    date: "2023-12-01",
    time: "10:00 AM",
    volunteersNeeded: 5,
    points: 10,
    type: "crowd control"
  },
  {
    id: 2,
    name: "Prayer Hall Setup",
    date: "2023-12-01",
    time: "9:00 AM",
    volunteersNeeded: 3,
    points: 15,
    type: "setup"
  },
  {
    id: 3,
    name: "Clean-Up",
    date: "2023-12-02",
    time: "4:00 PM",
    volunteersNeeded: 4,
    points: 8,
    type: "clean-up"
  }
  // Add more tasks as needed
];

const TasksPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState({
    date: "",
    type: "",
    minPoints: 0
  });

  // Handle calendar date selection and filter tasks for that date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFilter({ ...filter, date: date.toISOString().split("T")[0] });
  };

  // Filter tasks based on selected criteria
  const filteredTasks = tasks.filter((task) => {
    return (
      (!filter.date || task.date === filter.date) &&
      (!filter.type || task.type === filter.type) &&
      task.points >= filter.minPoints
    );
  });

  // Display task names on the calendar on specific dates
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const tasksForDate = tasks.filter(
        (task) => new Date(task.date).toDateString() === date.toDateString()
      );
      return tasksForDate.length ? (
        <ul className="text-xs mt-2 text-yellow-400 space-y-1">
          {tasksForDate.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      ) : null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {" "}
        {/* Container with max-width */}
        {/* Header Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Available Volunteer Tasks
          </h1>
          <p className="text-lg mt-4 text-blue-200">
            Browse all tasks that need support and sign up for those that fit
            your interests and schedule.
          </p>
        </section>
        {/* Filter Options */}
        <h2 className="text-3xl font-semibold text-primary mb-4  text-center">
          Filter Tasks
        </h2>
        <section className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex-1">
              <label className="block text-blue-500 mb-2 font-bold">Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-blue-500 mb-2 font-bold">
                Task Type
              </label>
              <select
                className="select select-bordered w-full"
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="setup">Setup</option>
                <option value="clean-up">Clean-Up</option>
                <option value="crowd control">Crowd Control</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-blue-500 mb-2 font-bold">
                Min Points
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Min Points"
                value={filter.minPoints}
                onChange={(e) =>
                  setFilter({ ...filter, minPoints: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </section>
        {/* Calendar Section */}
        <section className="mb-12 bg-gray-800 p-4 rounded-lg shadow-lg">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={({ date, view }) =>
              view === "month" &&
              date.toDateString() === selectedDate.toDateString()
                ? "bg-blue-600 text-white rounded-lg"
                : "hover:bg-gray-700 hover:text-white rounded-lg transition duration-300"
            }
            className="w-full bg-gray-800 text-white rounded-lg shadow"
          />
        </section>
        {/* Task Cards for Selected Date */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Tasks for {selectedDate.toDateString()}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-bold text-yellow-400 mb-2">
                  {task.name}
                </h3>
                <p className="text-gray-300">Date: {task.date}</p>
                <p className="text-gray-300">Time: {task.time}</p>
                <p className="text-gray-300">
                  Volunteers Needed: {task.volunteersNeeded}
                </p>
                <p className="text-gray-300">Points: {task.points}</p>
                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                  onClick={() => alert(`Signed up for ${task.name}`)}
                >
                  Sign Up
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TasksPage;
