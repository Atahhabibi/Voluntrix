import React from "react";
import { FaTable } from "react-icons/fa";

const DetailTablesPageError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaTable className="text-6xl text-green-400 mb-4" />
    <h1 className="text-4xl font-bold">Table Data Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      Unable to load table details. Please refresh the page or try again later.
    </p>
  </div>
);

export default DetailTablesPageError;
