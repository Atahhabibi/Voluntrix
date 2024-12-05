import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { formatDate } from './../util/dataHandlingFunctions';

const ITEMS_PER_PAGE = 3;

const ProfileTableData = ({ title, data = [], onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = ITEMS_PER_PAGE;

  const totalPages = Math.ceil(data.length / recordsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col min-h-[320px]">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="overflow-y-auto max-h-64 flex-grow">
        <table className="table-auto w-full text-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-600">Name</th>
              <th className="px-4 py-2 border border-gray-600">Date</th>
              <th className="px-4 py-2 border border-gray-600">Time</th>
              {onDelete && (
                <th className="px-4 py-2 border border-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  } hover:bg-gray-500 transition text-gray-300`}
                >
                  <td className="px-4 py-2 text-center border border-gray-600">
                    {item.name || "Unnamed"}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-600">
                    {formatDate(item.date) || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-600">
                    {item.time || "N/A"}
                  </td>
                  {onDelete && (
                    <td className="px-4 py-2 text-center border border-gray-600">
                      <button
                        onClick={() => onDelete(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={onDelete ? 4 : 3}
                  className="text-center py-16 text-gray-400 border border-gray-600"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfileTableData;
