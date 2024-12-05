import React from "react";
import { FaUserShield } from "react-icons/fa";

const UserDashboardError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaUserShield className="text-6xl text-blue-400 mb-4" />
    <h1 className="text-4xl font-bold">User Dashboard Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      Oops! We encountered an issue loading your dashboard. Please try again
      later.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
    >
      Refresh Page
    </button>
  </div>
);

export default UserDashboardError;
