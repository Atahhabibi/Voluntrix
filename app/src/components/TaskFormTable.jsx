import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

const TaskTable = ({ tasks, onDelete, setTaskToEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const currentTasks = tasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Fill empty rows to ensure consistent row height
  const rowsToFill = Math.max(0, ITEMS_PER_PAGE - currentTasks.length);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex flex-col min-h-[400px]">
      <h2 className="text-2xl text-white font-semibold mb-6 text-center">
        Task Records
      </h2>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 text-lg py-10">
          No tasks available.
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto">
            <table className="table-auto w-full text-gray-400 text-sm border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white text-center">
                  <th className="px-4 py-2 border border-gray-600 w-[75%] h-[50px]">
                    Task Name
                  </th>
                  <th className="px-4 py-2 border border-gray-600 w-[25%] h-[50px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Render rows for current tasks */}
                {currentTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="text-center border-b border-gray-700"
                  >
                    <td className="px-4 py-2 border border-gray-600 text-left h-[50px]">
                      {task.name || ""}
                    </td>
                    <td className="px-4 py-2 border border-gray-600 h-[50px] flex justify-center space-x-2">
                      <button
                        onClick={() => setTaskToEdit(task)}
                        className="p-2 bg-yellow-500 rounded text-white flex items-center justify-center hover:bg-yellow-600 transition"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 bg-red-600 rounded text-white flex items-center justify-center hover:bg-red-700 transition"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Add empty rows to fill up to ITEMS_PER_PAGE */}
                {rowsToFill > 0 &&
                  Array.from({ length: rowsToFill }).map((_, index) => (
                    <tr
                      key={`empty-row-${index}`}
                      className="border-b border-gray-700"
                    >
                      <td className="px-4 py-2 border border-gray-600 w-[75%] h-[50px]">
                        &nbsp;
                      </td>
                      <td className="px-4 py-2 border border-gray-600 w-[25%] h-[50px]">
                        &nbsp;
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-gray-400">
              Page {currentPage} of {totalPages || 1}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskTable;
