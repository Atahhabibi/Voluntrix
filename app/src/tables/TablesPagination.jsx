import React from "react";

const TablesPagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-600"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-600"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default TablesPagination;
