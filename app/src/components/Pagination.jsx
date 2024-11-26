import React from "react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Previous
      </button>
      <p className="text-gray-400">
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
