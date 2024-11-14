import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calenderStyles.css";

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
  },
  {
    id: 3,
    name: "Clean-Up",
    date: "2023-12-02",
    time: "4:00 PM",
    volunteersNeeded: 4,
    points: 8,
    type: "clean-up"
  },
  {
    id: 3,
    name: "Clean-Up",
    date: "2023-12-02",
    time: "4:00 PM",
    volunteersNeeded: 4,
    points: 8,
    type: "clean-up"
  },
  {
    id: 3,
    name: "Clean-Up",
    date: "2023-12-02",
    time: "4:00 PM",
    volunteersNeeded: 4,
    points: 8,
    type: "clean-up"
  },
];

const TasksPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState({
    date: "",
    type: "",
    minPoints: 0
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFilter({ ...filter, date: date.toISOString().split("T")[0] });
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (!filter.date || task.date === filter.date) &&
      (!filter.type || task.type === filter.type) &&
      task.points >= filter.minPoints
    );
  });

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
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold uppercase text-gray-300">
            Available Volunteer Tasks
          </h1>
          <p className="text-xl mt-4 text-gray-300">
            Browse all tasks that need support and sign up for those that fit
            your interests and schedule.
          </p>
        </section>

        {/* Filter Options */}
        <section className="mb-8 bg-base-300 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex-1">
              <label className="block text-primary mb-2 font-bold">Date</label>
              <input
                type="date"
                className="input input-bordered w-full bg-base-100"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-primary mb-2 font-bold">
                Task Type
              </label>
              <select
                className="select select-bordered w-full bg-base-100"
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
              <label className="block text-primary mb-2 font-bold">
                Min Points
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
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
        <section className="mb-12 bg-base-300 p-4 rounded-lg shadow-lg">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={({ date, view }) =>
              view === "month" &&
              date.toDateString() === selectedDate.toDateString()
                ? "bg-primary text-white rounded-lg"
                : "hover:bg-base-200 hover:text-white rounded-lg transition duration-300"
            }
            className="w-full bg-base-100 text-white rounded-lg shadow"
          />
        </section>

        {/* Task Cards for Selected Date */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Tasks for {selectedDate.toDateString()}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-base-300 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-bold text-white  mb-2">
                  {task.name}
                </h3>
                <p className="text-gray-300">Date: {task.date}</p>
                <p className="text-gray-300">Time: {task.time}</p>
                <p className="text-gray-300">
                  Volunteers Needed: {task.volunteersNeeded}
                </p>
                <p className="text-gray-300">Points: {task.points}</p>
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-primary-focus transition duration-300"
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
