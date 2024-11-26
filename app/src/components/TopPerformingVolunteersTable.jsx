import React, { useState } from "react";
import Pagination from "./Pagination"; // Import reusable Pagination component

const TopPerformingVolunteersTable = () => {
  // Temporary sample data
  const allTopVolunteers = [
    { username: "VolunteerD", hoursWorked: 20, points: 200 },
    { username: "VolunteerB", hoursWorked: 15, points: 150 },
    { username: "VolunteerA", hoursWorked: 10, points: 100 },
    { username: "VolunteerC", hoursWorked: 12, points: 120 },
    { username: "VolunteerE", hoursWorked: 18, points: 180 }
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  const totalPages = Math.ceil(allTopVolunteers.length / recordsPerPage);
  const currentVolunteers = allTopVolunteers.slice(
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
        Top Performing Volunteers
      </h3>
      <div className="overflow-y-auto max-h-64">
        <table className="table-auto w-full text-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Hours Worked</th>
              <th className="px-4 py-2">Total Points</th>
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
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {volunteer.username}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {volunteer.hoursWorked}
                  </td>
                  <td className="px-4 py-2 text-center">{volunteer.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No volunteers available.
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

export default TopPerformingVolunteersTable;
