import React from "react";
import { useRouteError } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import notFoundImage from '../images/not-found.svg'

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      {/* Illustration */}
      <img
        src={notFoundImage}
        alt="Error Illustration"
        className="w-80 mb-8"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-yellow-400">
        Oops! Something Went Wrong
      </h1>

      {/* Error Message */}
      <p className="text-gray-300 mb-6 text-center">
        {error?.statusText ||
          "An unexpected error occurred. Please try again later."}
      </p>

      {/* Additional Error Details */}
      {error?.status && (
        <p className="text-sm text-gray-500">
          Error Code: <span className="text-red-400">{error.status}</span>
        </p>
      )}

      {/* Back to Home Button */}
      <a
        href="/"
        className="flex items-center mt-6 px-6 py-2 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        <FaHome className="mr-2" /> Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
