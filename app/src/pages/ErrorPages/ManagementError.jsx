import React from "react";
import { FaClipboardList } from "react-icons/fa";

const ManagementError = ({ page }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaClipboardList className="text-6xl text-red-500 mb-4" />
    <h1 className="text-4xl font-bold">{`${page} Management Error`}</h1>
    <p className="text-lg text-gray-400 mt-2">
      Something went wrong while loading {page.toLowerCase()} data. Please try
      again later.
    </p>
  </div>
);

export default ManagementError;
