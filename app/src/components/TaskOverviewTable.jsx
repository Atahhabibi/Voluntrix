import React, { useState } from "react";
import Pagination from "./Pagination"; // Import the reusable Pagination component

const TaskOverviewTable = ({ tasks, isLoading, isError }) => {

  
  // Handle loading or error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading tasks...</div>;
  }

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  const totalPages = Math.ceil(tasks.length / recordsPerPage);
  const currentTasks = tasks.slice(
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

  // Map status based on volunteersAssigned
  const getStatus = (task) => {
    if (task.volunteersAssigned.length === 0) {
      return "Not Started";
    }
    const firstVolunteerStatus =
      task.volunteersAssigned[0]?.status || "Not Started";
    if (firstVolunteerStatus === "completed") return "Completed";
    if (firstVolunteerStatus === "signedUp") return "Pending";
    return "Not Started";
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Task Overview</h3>
      <div className="overflow-y-auto max-h-64">
        <table className="table-auto w-full text-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Task Name</th>
              <th className="px-4 py-2">Volunteers Needed</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map((task, index) => (
                <tr
                  key={task._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  } hover:bg-gray-500 transition`}
                >
                  <td className="px-4 py-2 text-center">{task.name}</td>
                  <td className="px-4 py-2 text-center">
                    {task.volunteersNeeded}
                  </td>
                  <td className="px-4 py-2 text-center">{getStatus(task)}</td>
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
