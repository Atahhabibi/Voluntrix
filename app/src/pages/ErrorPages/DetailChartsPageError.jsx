import React from "react";
import { FaChartBar } from "react-icons/fa";

const DetailChartsPageError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaChartBar className="text-6xl text-yellow-400 mb-4" />
    <h1 className="text-4xl font-bold">Chart Data Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      We couldn't load the chart details. Please check your connection or try
      again later.
    </p>
  </div>
);

export default DetailChartsPageError;
