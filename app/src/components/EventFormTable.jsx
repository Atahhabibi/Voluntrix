import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const EventFormTable = ({ events, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pagination logic
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const currentEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fill empty rows to ensure at least 5 rows
  const rowsToFill = Math.max(0, itemsPerPage - currentEvents.length);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex flex-col min-h-[400px]">
      <h2 className="text-2xl text-white font-semibold mb-6 text-center">
        Event Records
      </h2>
      <div className="flex-grow overflow-y-auto">
        <table className="table-auto w-full text-gray-400 text-sm border-collapse">
          <thead>
            <tr className="bg-gray-700 text-white text-center">
              <th className="px-4 py-2 border border-gray-600 w-[60%] h-[50px]">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-600 w-[40%] h-[50px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Render rows for current events */}
            {currentEvents.map((event) => (
              <tr
                key={event._id}
                className="text-center border-b border-gray-700"
              >
                <td className="px-4 py-2 border border-gray-600 text-left h-[50px]">
                  {event.name || ""}
                </td>
                <td className="px-4 py-2 border border-gray-600 h-[50px] flex justify-center space-x-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="p-2 bg-yellow-500 rounded text-white flex items-center justify-center hover:bg-yellow-600 transition"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(event)}
                    className="p-2 bg-red-600 rounded text-white flex items-center justify-center hover:bg-red-700 transition"
                  >
                    <FaTrashAlt className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Add empty rows to fill up to 5 */}
            {rowsToFill > 0 &&
              Array.from({ length: rowsToFill }).map((_, index) => (
                <tr
                  key={`empty-row-${index}`}
                  className="border-b border-gray-700"
                >
                  <td className="px-4 py-2 border border-gray-600 w-[60%] h-[50px]">
                    &nbsp;
                  </td>
                  <td className="px-4 py-2 border border-gray-600 w-[40%] h-[50px]">
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
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-gray-400">
          Page {currentPage} of {totalPages || 1}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventFormTable;
