import React from "react";
import { FaUsers } from "react-icons/fa";

const VolunteerManagementPageError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaUsers className="text-6xl text-purple-400 mb-4" />
    <h1 className="text-4xl font-bold">Volunteer Management Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      Unable to load volunteer data. Please try again later or contact support.
    </p>
  </div>
);

export default VolunteerManagementPageError;
