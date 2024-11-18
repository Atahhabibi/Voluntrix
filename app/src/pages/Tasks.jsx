import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaFilter,
  FaClock,
  FaUserFriends,
  FaCheck,
  FaTasks
} from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Sample tasks data
const tasks = [
  {
    id: 1,
    name: "Parking Assistance",
    date: "2024-11-05",
    time: "10:00 AM",
    volunteersNeeded: 5,
    points: 10,
    type: "crowd control"
  },
  {
    id: 2,
    name: "Prayer Hall Setup",
    date: "2024-11-07",
    time: "9:00 AM",
    volunteersNeeded: 3,
    points: 15,
    type: "setup"
  },
  {
    id: 3,
    name: "Community Clean-Up",
    date: "2024-11-09",
    time: "2:00 PM",
    volunteersNeeded: 6,
    points: 12,
    type: "clean-up"
  },
  {
    id: 4,
    name: "Eid Decoration Setup",
    date: "2024-11-11",
    time: "6:00 PM",
    volunteersNeeded: 4,
    points: 18,
    type: "setup"
  },
  {
    id: 5,
    name: "Fundraising Event Coordination",
    date: "2024-11-13",
    time: "3:00 PM",
    volunteersNeeded: 8,
    points: 20,
    type: "event coordination"
  },
  {
    id: 6,
    name: "Iftar Meal Preparation",
    date: "2024-11-15",
    time: "5:00 PM",
    volunteersNeeded: 4,
    points: 15,
    type: "meal prep"
  },
  {
    id: 7,
    name: "Islamic Book Fair Setup",
    date: "2024-11-18",
    time: "11:00 AM",
    volunteersNeeded: 7,
    points: 25,
    type: "setup"
  },
  {
    id: 8,
    name: "Car Parking Assistance",
    date: "2024-11-20",
    time: "8:00 AM",
    volunteersNeeded: 6,
    points: 12,
    type: "crowd control"
  },
  {
    id: 9,
    name: "Children's Quran Recitation",
    date: "2024-11-22",
    time: "4:00 PM",
    volunteersNeeded: 5,
    points: 10,
    type: "event"
  },
  {
    id: 10,
    name: "Annual Mosque Cleanup",
    date: "2024-11-25",
    time: "10:00 AM",
    volunteersNeeded: 12,
    points: 30,
    type: "clean-up"
  }
];

const TasksPage = () => {
  const [filter, setFilter] = useState({
    date: "",
    type: "",
    minPoints: 0
  });
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  // Apply filters to tasks and only show tasks for the selected date
  const applyFilters = () => {
    const filtered = tasks.filter((task) => {
      return (
        (!filter.date || task.date === filter.date) &&
        (!filter.type || task.type === filter.type) &&
        task.points >= filter.minPoints
      );
    });
    setFilteredTasks(filtered);
  };



  useEffect(() => {
    applyFilters();
  }, [filter]);

  const handleDateChange = (date) => {
    const selectedDate = date.toISOString().split("T")[0]; // Format to 'yyyy-mm-dd'
    setFilter({ ...filter, date: selectedDate });
  };

  const handleTaskTypeChange = (e) => {
    setFilter({ ...filter, type: e.target.value });
  };

  const handleMinPointsChange = (e) => {
    setFilter({ ...filter, minPoints: Number(e.target.value) });
  };

  const calendarEvents = filteredTasks.map((task) => ({
    title: task.name,
    date: task.date,
    description: ` ${task.time}`,
    extendedProps: { type: task.type, volunteersNeeded: task.volunteersNeeded }
  }));

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-300 flex justify-center items-center gap-2">
            <FaTasks /> Available Volunteer Tasks
          </h1>
          <p className="text-lg mt-4 text-gray-300">
            Browse all tasks that need support and sign up for those that fit
            your interests and schedule.
          </p>
        </section>

        {/* Filter Options */}
        <section className="mb-8 bg-base-300 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex-1">
              <label className="block text-primary mb-2 font-bold flex items-center gap-2">
                <FaCalendarAlt /> Date
              </label>
              <input
                type="date"
                className="input input-bordered w-full bg-base-100"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-primary mb-2 font-bold flex items-center gap-2">
                <FaFilter /> Task Type
              </label>
              <select
                className="select select-bordered w-full bg-base-100"
                value={filter.type}
                onChange={handleTaskTypeChange}
              >
                <option value="">Select Type</option>
                <option value="setup">Setup</option>
                <option value="clean-up">Clean-Up</option>
                <option value="crowd control">Crowd Control</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-primary mb-2 font-bold flex items-center gap-2">
                <FaCheck /> Min Points
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
                placeholder="Min Points"
                value={filter.minPoints}
                onChange={handleMinPointsChange}
              />
            </div>
          </div>
        </section>

        {/* FullCalendar Section */}
        <section className="mb-12 bg-base-300 p-4 rounded-lg shadow-lg hidden sm:block">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            dateClick={(info) => {
              handleDateChange(info.date);
            }}
            eventClick={(info) => alert(info.event.title)}
            eventContent={(eventInfo) => (
              <div className="text-xs text-white ">
                <p>
                  {eventInfo.event.title.length > 10
                    ? eventInfo.event.title.slice(0, 10)
                    : eventInfo.event.extendedProps.description}
                </p>
                <p>{eventInfo.event.extendedProps.description}</p>
              </div>
            )}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay"
            }}
            contentHeight="auto"
            eventTextColor="#000000" // Ensure text is visible
          />
        </section>

        {/* Task Cards for Selected Date */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-400" /> Tasks for{" "}
            {filter.date || "Select a date"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="card bg-slate-800 shadow-md p-6 border border-gray-600 rounded-lg transition transform hover:shadow-xl hover:scale-105"
                style={{ maxHeight: "380px", minHeight: "320px" }} // Fixed max height and consistent min height
              >
                {/* Card Title */}
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2 truncate">
                  <FaTasks className="text-blue-400" /> {task.name}
                </h3>

                {/* Card Content */}
                <div className="text-gray-300 space-y-3">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-400" />
                    <span className="font-medium truncate">
                      Date: {task.date}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-blue-400" />
                    <span className="font-medium truncate">
                      Time: {task.time}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUserFriends className="text-green-400" />
                    <span className="font-medium truncate">
                      Volunteers Needed: {task.volunteersNeeded}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCheck className="text-purple-400" />
                    <span className="font-medium text-purple-300 truncate">
                      Points: {task.points}
                    </span>
                  </p>
                </div>

                {/* Sign Up Button */}
                <button
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 flex items-center justify-center gap-2"
                  onClick={() => alert(`Signed up for ${task.name}`)}
                >
                  <FaCheck className="text-white" /> Sign Up
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
