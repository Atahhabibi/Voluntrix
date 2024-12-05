import React from "react";
import { FaHome } from "react-icons/fa";

const HomeLayoutError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaHome className="text-6xl text-blue-400 mb-4" />
    <h1 className="text-4xl font-bold">Home Layout Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      Something went wrong while loading the home page layout. Please refresh
      the page or try again later.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
    >
      Refresh Page
    </button>
  </div>
);

export default HomeLayoutError;
