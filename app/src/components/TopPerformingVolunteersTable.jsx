import React, { useState } from "react";
import Pagination from "./Pagination"; // Import reusable Pagination component

const TopPerformingVolunteersTable = ({ users = [], isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Fixed number of rows

  // Sort users by points in descending order
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  const totalPages = Math.ceil(sortedUsers.length / recordsPerPage);
  const currentVolunteers = sortedUsers.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-400">Error loading data...</div>
    );
  }

  // Add empty rows to maintain a fixed height
  const rows = [...currentVolunteers];
  while (rows.length < recordsPerPage) {
    rows.push({ username: "", hoursWorked: "", points: "" });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px] mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">
        Top Performing Volunteers by Rank
      </h3>
      <div className="overflow-y-auto max-h-[300px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 h-10">Rank</th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Username
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Hours Worked
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Total Points
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((volunteer, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                } hover:bg-gray-500 transition`}
              >
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {volunteer.username
                    ? (currentPage - 1) * recordsPerPage + index + 1
                    : ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {volunteer.username || ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {volunteer.hoursWorked || ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {volunteer.points || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
