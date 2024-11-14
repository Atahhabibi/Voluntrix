import React from "react";

const events = [
  {
    id: 1,
    name: "Eid Prayer",
    date: "2024-04-10",
    time: "9:00 AM"
  },
  {
    id: 2,
    name: "Annual Cleanup",
    date: "2024-12-15",
    time: "10:00 AM"
  }
];

const EventManagementPage = () => {
  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-screen-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Event Management</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl text-white">{event.name}</h3>
                  <p className="text-gray-400">Date: {event.date}</p>
                  <p className="text-gray-400">Time: {event.time}</p>
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

export default EventManagementPage;
