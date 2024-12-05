import React from "react";
import { FaFileAlt } from "react-icons/fa";

const RecordsPageError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaFileAlt className="text-6xl text-red-400 mb-4" />
    <h1 className="text-4xl font-bold">Records Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      There was an error loading records. Please try again later.
    </p>
  </div>
);

export default RecordsPageError;
