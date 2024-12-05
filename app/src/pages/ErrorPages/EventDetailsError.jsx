import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const EventDetailsError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaExclamationTriangle className="text-6xl text-yellow-500 mb-4" />
    <h1 className="text-4xl font-bold">Event Not Found</h1>
    <p className="text-lg text-gray-400 mt-2">
      We couldn’t find the event you’re looking for. Please try again later.
    </p>
  </div>
);

export default EventDetailsError;
