import React, { useState } from "react";
import TablesPagination from "./TablesPagination";

const HighPointsTasksTable = ({ tasks, isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(tasks.length / recordsPerPage);
  const currentTasks = tasks
    .sort((a, b) => b.points - a.points)
    .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-400">
        Loading high points tasks...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400">
        Error loading high points tasks!
      </div>
    );
  }

  // Add empty rows to ensure table always has 5 rows
  const rows = [...currentTasks];
  while (rows.length < recordsPerPage) {
    rows.push({ name: "", date: "", points: "" }); // Empty placeholders
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px] mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">
        High Points Tasks
      </h3>
      <div className="overflow-y-auto max-h-[350px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 h-10 text-sm">
                Task Name
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10 text-sm">
                Date
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10 text-sm">
                Points
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
                  {task.date ? new Date(task.date).toLocaleDateString() : ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {task.points !== "" ? task.points : ""}
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

export default HighPointsTasksTable;
