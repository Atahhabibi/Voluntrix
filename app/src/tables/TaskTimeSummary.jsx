import React, { useState } from "react";
import TablesPagination from "./TablesPagination";

const TaskTimeSummary = ({ timeRecords = [], isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const tasks = timeRecords.filter((record) => record.type === "task");
  const totalPages = Math.ceil(tasks.length / recordsPerPage);
  const currentTasks = tasks.slice(
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
        Loading task time summary...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400">
        Error loading task time summary...
      </div>
    );
  }

  // Add empty rows to ensure table always has 5 rows
  const rows = [...currentTasks];
  while (rows.length < recordsPerPage) {
    rows.push({ name: "", timeSpent: "", pointsEarned: "" });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px]">
      <h3 className="text-lg font-semibold text-white mb-4">
        Task Time Summary
      </h3>
      <div className="overflow-y-auto max-h-[350px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 h-10">
                Task Name
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
            {rows.map((task, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                } hover:bg-gray-500 transition`}
              >
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {task.name}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {task.timeSpent !== "" ? task.timeSpent : ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {task.pointsEarned !== "" ? task.pointsEarned : ""}
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

export default TaskTimeSummary;
