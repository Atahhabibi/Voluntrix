import React from "react";
import { FaShieldAlt } from "react-icons/fa";

const AdminDashboardError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaShieldAlt className="text-6xl text-red-500 mb-4" />
    <h1 className="text-4xl font-bold">Admin Dashboard Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      We encountered an issue loading the Admin Dashboard. Please refresh or
      contact support.
    </p>
  </div>
);

export default AdminDashboardError;
