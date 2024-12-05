import React, { useState } from "react";
import TablesPagination from "./TablesPagination";

const UserTimeLog = ({ timeRecords = [], isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(timeRecords.length / recordsPerPage);
  const currentRecords = timeRecords.slice(
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
      <div className="text-center text-gray-400">Loading user time log...</div>
    );
  }
  if (isError) {
    return (
      <div className="text-center text-red-400">
        Error loading user time log...
      </div>
    );
  }

  // Add empty rows to ensure table always has 5 rows
  const rows = [...currentRecords];
  while (rows.length < recordsPerPage) {
    rows.push({ name: "", clockIn: "", clockOut: "", pointsEarned: "" });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px] mt-8 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">User Time Log</h3>
      <div className="overflow-y-auto max-h-[350px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 h-10">
                Activity Name
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Clock-In
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Clock-Out
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Points Earned
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                } hover:bg-gray-500 transition`}
              >
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {record.name}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {record.clockIn
                    ? new Date(record.clockIn).toLocaleTimeString()
                    : ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {record.clockOut
                    ? new Date(record.clockOut).toLocaleTimeString()
                    : ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {record.pointsEarned}
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

export default UserTimeLog;
