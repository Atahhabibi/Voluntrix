import React from "react";
import { FaClock } from "react-icons/fa";

const ClockInOutError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaClock className="text-6xl text-purple-400 mb-4" />
    <h1 className="text-4xl font-bold">Clock In/Out Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      Something went wrong while processing your clock-in or clock-out request.
      Please try again later or contact support if the issue persists.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-6 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg"
    >
      Refresh Page
    </button>
  </div>
);

export default ClockInOutError;
