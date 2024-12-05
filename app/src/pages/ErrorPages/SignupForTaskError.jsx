import React from "react";
import { FaTasks } from "react-icons/fa";

const SignupForTaskError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaTasks className="text-6xl text-yellow-400 mb-4" />
    <h1 className="text-4xl font-bold">Task Signup Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      We encountered an issue while processing your task signup. Please try
      again later or contact support for assistance.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg"
    >
      Refresh Page
    </button>
  </div>
);

export default SignupForTaskError;
