import React from "react";
import { FaUserAltSlash } from "react-icons/fa";

const ProfileError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <FaUserAltSlash className="text-6xl text-red-500 mb-4" />
    <h1 className="text-4xl font-bold">Profile Error</h1>
    <p className="text-lg text-gray-400 mt-2">
      Something went wrong while loading the profile. Please refresh the page or
      try again later.
    </p>
  </div>
);

export default ProfileError;
