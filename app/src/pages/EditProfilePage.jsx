import React, { useState } from "react";
import { FaSave, FaArrowLeft, FaUpload } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../util/customFetch";
import useUserData from "../util/useUserData";
import useHandleImageUpload from "../util/handleImageUpload";

export const loader = async () => {
  return useUserData();
};

const EditProfilePage = () => {
  const { user: volunteer } = useLoaderData();
  const navigate = useNavigate();

  const {
    handleImageUpload,
    uploading,
    profileImage: imagefromHook
  } = useHandleImageUpload();

  const [formData, setFormData] = useState({
    username: volunteer.username,
    email: volunteer.email,
    profileImage: imagefromHook,
    password: "" // Empty by default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    handleImageUpload(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No token found,please log in again");
    }

    try {
      const payload = { ...formData };

      if (!payload.password) delete payload.password; // Remove password if not updated
      const response = await customFetch.put(`/user`, payload);

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        navigate(`/profile/${volunteer._id}`); // Navigate back to the profile page
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

 

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-secondary mb-4 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        {/* Edit Profile Card */}
        <div className="card w-full bg-gray-800 shadow-lg p-6 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              {uploading && <p>Uploading....</p>}
              <img
                src={imagefromHook || volunteer.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
              />
              <label className="btn btn-outline btn-primary flex items-center cursor-pointer">
                <FaUpload className="mr-2" />
                Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-white mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input input-bordered w-full bg-gray-700 text-white"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full bg-gray-700 text-white"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white mb-2">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full bg-gray-700 text-white"
                placeholder="Leave blank to keep current password"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
