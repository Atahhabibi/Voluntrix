import React from "react";
import { FaHome } from "react-icons/fa";

const LandingError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaHome className="text-6xl text-blue-400 mb-4" />
    <h1 className="text-4xl font-bold">Landing Page Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      Oops! Something went wrong on the landing page. Please try again later.
    </p>
  </div>
);

export default LandingError;
