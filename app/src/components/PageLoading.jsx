import React from "react";
import { FaSpinner } from "react-icons/fa";

const PageLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <FaSpinner className="text-blue-500 text-6xl animate-spin mb-4" />
      <h1 className="text-2xl font-semibold">Loading...</h1>
      <p className="text-gray-400 mt-2">
        Please wait while we load the page for you.
      </p>
    </div>
  );
};

export default PageLoading;
