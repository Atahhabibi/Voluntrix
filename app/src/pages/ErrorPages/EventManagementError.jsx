import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const EventManagementError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaCalendarAlt className="text-6xl text-green-400 mb-4" />
    <h1 className="text-4xl font-bold">Event Management Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      We couldn't load the event management page. Please check your connection
      or try again later.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
    >
      Refresh Page
    </button>
  </div>
);

export default EventManagementError;
