import React, { useState } from "react";
import Pagination from "./Pagination"; // Import the reusable Pagination component

const EventOverviewTable = () => {
  // Temporary sample data
  const allEvents = [
    {
      name: "Community Iftar",
      date: "2024-05-10",
      type: "Religious",
      location: "Main Hall",
      status: "Completed"
    },
    {
      name: "Charity Drive",
      date: "2024-05-15",
      type: "Community",
      location: "Outdoor Grounds",
      status: "Pending"
    },
    {
      name: "Youth Quran Circle",
      date: "2024-05-20",
      type: "Educational",
      location: "Library",
      status: "Not Started"
    },
    {
      name: "Eid Celebration",
      date: "2024-05-25",
      type: "Religious",
      location: "Main Hall",
      status: "Completed"
    },
    {
      name: "Ramadan Workshop",
      date: "2024-05-30",
      type: "Educational",
      location: "Classroom A",
      status: "Pending"
    },
    {
      name: "Volunteer Training",
      date: "2024-06-05",
      type: "Training",
      location: "Conference Room",
      status: "Not Started"
    }
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  const totalPages = Math.ceil(allEvents.length / recordsPerPage);
  const currentEvents = allEvents.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Pagination Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Event Overview</h3>
      <div className="overflow-y-auto max-h-64">
        <table className="table-auto w-full text-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Event Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  } hover:bg-gray-500 transition`}
                >
                  <td className="px-4 py-2 text-center">{event.name}</td>
                  <td className="px-4 py-2 text-center">{event.date}</td>
                  <td className="px-4 py-2 text-center">{event.type}</td>
                  <td className="px-4 py-2 text-center">{event.location}</td>
                  <td className="px-4 py-2 text-center">{event.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No events available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default EventOverviewTable;
