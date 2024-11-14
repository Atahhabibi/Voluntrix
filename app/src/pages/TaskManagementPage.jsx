import React from "react";

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
  }
];

const TaskManagementPage = () => {
  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-screen-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Task Management</h2>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border p-4 rounded-lg bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl text-white">{task.name}</h3>
                  <p className="text-gray-400">Date: {task.date}</p>
                  <p className="text-gray-400">Time: {task.time}</p>
                  <p className="text-gray-400">
                    Volunteers Needed: {task.volunteersNeeded}
                  </p>
                  <p className="text-gray-400">Points: {task.points}</p>
                </div>
                <div className="space-x-2">
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-error">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManagementPage;
