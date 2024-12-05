import React from "react";
import { FaTasks } from "react-icons/fa";

const TaskManagementPageError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaTasks className="text-6xl text-yellow-400 mb-4" />
    <h1 className="text-4xl font-bold">Task Management Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      We encountered an issue loading tasks. Please refresh the page.
    </p>
  </div>
);

export default TaskManagementPageError;
