import React, { useState } from "react";
import Pagination from "./Pagination"; // Import the reusable Pagination component

const TaskOverviewTable = () => {
  // Temporary sample data
  const allTasks = [
    {
      name: "Clean Prayer Hall",
      volunteers: 5,
      status: "Completed",
      points: 10
    },
    { name: "Setup Iftar", volunteers: 3, status: "Pending", points: 20 },
    {
      name: "Organize Library",
      volunteers: 2,
      status: "Not Started",
      points: 15
    },
    {
      name: "Distribute Zakat",
      volunteers: 4,
      status: "Completed",
      points: 25
    },
    {
      name: "Setup Ramadan Program",
      volunteers: 6,
      status: "Pending",
      points: 30
    },
    {
      name: "Volunteer Training",
      volunteers: 8,
      status: "Not Started",
      points: 40
    }
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  const totalPages = Math.ceil(allTasks.length / recordsPerPage);
  const currentTasks = allTasks.slice(
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-md ">
      <h3 className="text-lg font-semibold text-white mb-4">Task Overview</h3>
      <div className="overflow-y-auto max-h-64">
        <table className="table-auto w-full text-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Task Name</th>
              <th className="px-4 py-2">Volunteers</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map((task, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  } hover:bg-gray-500 transition`}
                >
                  <td className="px-4 py-2 text-center">{task.name}</td>
                  <td className="px-4 py-2 text-center">{task.volunteers}</td>
                  <td className="px-4 py-2 text-center">{task.status}</td>
                  <td className="px-4 py-2 text-center">{task.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No tasks available.
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

export default TaskOverviewTable;
