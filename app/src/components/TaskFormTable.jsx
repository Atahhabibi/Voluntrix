import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

const TaskTable = ({ tasks, onDelete, onEdit }) => {
  console.log(tasks);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const currentTasks = tasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="card bg-gray-800 p-6 shadow-md border border-gray-700 overflow-x-auto min-h-[400px] flex flex-col">
      <h2 className="text-2xl text-white font-semibold mb-4 text-center">
        Task Records
      </h2>
      <table className="table-auto w-full text-gray-400 text-sm">
        <thead>
          <tr className="bg-gray-700 text-white text-center">
            <th className="px-4 py-2 border border-gray-600">Task Name</th>
            <th className="px-4 py-2 border border-gray-600">Date</th>
            <th className="px-4 py-2 border border-gray-600">Edit</th>
            <th className="px-4 py-2 border border-gray-600">Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length > 0 ? (
            currentTasks.map((task, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                } text-center`}
              >
                <td className="px-4 py-2 border border-gray-600">
                  {task.name}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {task.date}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onEdit(task)}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(task._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center py-4 text-gray-500 border border-gray-600"
              >
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-auto flex justify-between items-center pt-4">
        <button
          className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </button>
        <p className="text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskTable;
