import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationCircle } from "react-icons/fa";

const PageError = ({ message = "Something went wrong!" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-lg shadow-md">
        <FaExclamationCircle className="text-red-500 text-6xl" />
        <div>
          <h1 className="text-3xl font-bold mb-2">Error</h1>
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
      <Link
        to="/"
        className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition"
      >
        <FaHome className="mr-2" /> Go Back to Home
      </Link>
    </div>
  );
};

export default PageError;
