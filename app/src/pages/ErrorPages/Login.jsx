import React from "react";
import { FaLock } from "react-icons/fa";

const AuthenticationError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaLock className="text-6xl text-yellow-400 mb-4" />
    <h1 className="text-4xl font-bold">Authentication Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      We couldn’t process your login or registration request. Please try again.
    </p>
  </div>
);

export default AuthenticationError;
