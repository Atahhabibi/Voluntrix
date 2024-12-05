import React, { useState } from "react";
import TablesPagination from "./TablesPagination";

const VolunteerParticipationTable = ({ tasks, isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(tasks.length / recordsPerPage);
  const currentTasks = tasks
    .map((task) => ({
      name: task.name || "",
      date: task.date ? new Date(task.date).toLocaleDateString() : "",
      totalSignedUp: task.name
        ? task.totalSignedUp !== undefined
          ? task.totalSignedUp
          : 0
        : "",
      totalCompleted: task.name
        ? task.totalCompleted !== undefined
          ? task.totalCompleted
          : 0
        : ""
    }))
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
        Loading participation data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400">
        Error loading participation data!
      </div>
    );
  }

  // Add empty rows to maintain a consistent table height
  const rows = [...currentTasks];
  while (rows.length < recordsPerPage) {
    rows.push({
      name: "",
      date: "",
      totalSignedUp: "",
      totalCompleted: ""
    });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px] mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">
        Volunteer Participation
      </h3>
      <div className="overflow-y-auto max-h-[350px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 h-10">
                Task Name
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">Date</th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Total Signed Up
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Total Completed
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
                  {task.date}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {task.totalSignedUp !== "" ? task.totalSignedUp : ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {task.totalCompleted !== "" ? task.totalCompleted : ""}
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

export default VolunteerParticipationTable;
