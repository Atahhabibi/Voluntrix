import React, { useState } from "react";
import Pagination from "./Pagination";

const PointsDistributionTable = () => {
  // Temporary sample data
  const allVolunteers = [
    { username: "VolunteerA", points: 100, tasks: 5, events: 2 },
    { username: "VolunteerB", points: 150, tasks: 8, events: 3 },
    { username: "VolunteerC", points: 80, tasks: 4, events: 1 },
    { username: "VolunteerD", points: 200, tasks: 10, events: 5 },
    { username: "VolunteerE", points: 120, tasks: 6, events: 2 },
    { username: "VolunteerF", points: 70, tasks: 3, events: 1 }
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  const totalPages = Math.ceil(allVolunteers.length / recordsPerPage);
  const currentVolunteers = allVolunteers.slice(
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
      <h3 className="text-lg font-semibold text-white mb-4">
        Points Distribution by Volunteers
      </h3>
      <div className="overflow-y-auto max-h-64">
        <table className="table-auto w-full text-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Total Points</th>
              <th className="px-4 py-2">Tasks Completed</th>
              <th className="px-4 py-2">Events Attended</th>
            </tr>
          </thead>
          <tbody>
            {currentVolunteers.length > 0 ? (
              currentVolunteers.map((volunteer, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  } hover:bg-gray-500 transition`}
                >
                  <td className="px-4 py-2 text-center">
                    {volunteer.username}
                  </td>
                  <td className="px-4 py-2 text-center">{volunteer.points}</td>
                  <td className="px-4 py-2 text-center">{volunteer.tasks}</td>
                  <td className="px-4 py-2 text-center">{volunteer.events}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No data available.
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

export default PointsDistributionTable;
