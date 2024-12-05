import React, { useState } from "react";
import TablesPagination from "./TablesPagination";

const EventTimeTracker = ({ timeRecords = [], isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Filter for event records
  const events = timeRecords.filter((record) => record.type === "event");
  const totalPages = Math.ceil(events.length / recordsPerPage);
  const currentEvents = events.slice(
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
    return (
      <div className="text-center text-gray-400">
        Loading event time tracker...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400">
        Error loading event time tracker...
      </div>
    );
  }

  // Add empty rows to ensure the table always has 5 rows
  const rows = [...currentEvents];
  while (rows.length < recordsPerPage) {
    rows.push({}); // Empty object for placeholders
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px] mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">
        Event Time Tracker
      </h3>
      <div className="overflow-y-auto max-h-[350px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 h-10">
                Event Name
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Time Spent (s)
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Points Earned
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((event, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                } hover:bg-gray-500 transition`}
              >
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {event.name || ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {event.timeSpent || ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {event.pointsEarned || ""}
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

export default EventTimeTracker;
