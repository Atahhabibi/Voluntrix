import React, { useState } from "react";
import TablesPagination from "./TablesPagination";

const VolunteerEventsTable = ({ users, isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Filter users to include only volunteers with assigned events
  const volunteersWithEvents = users.filter(
    (user) => user.role === "volunteer" && user.events.length > 0
  );
  const totalPages = Math.ceil(volunteersWithEvents.length / recordsPerPage);
  const currentVolunteers = volunteersWithEvents.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Add empty rows to ensure table always has 5 rows
  const rows = [...currentVolunteers];
  while (rows.length < recordsPerPage) {
    rows.push({ username: "", events: [] });
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-400">
        Loading volunteers with events...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400">
        Error loading volunteers with events!
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px]">
      <h3 className="text-lg font-semibold text-white mb-4">
        Volunteers with Assigned Events
      </h3>
      <div className="overflow-y-auto max-h-[350px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 h-10">
                Username
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Assigned Events
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
                  {volunteer.username}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {volunteer.events.length !== 0 ? volunteer.events.length : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default VolunteerEventsTable;
