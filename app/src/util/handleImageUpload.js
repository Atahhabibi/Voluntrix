import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { customFetch } from "./customFetch";

const useHandleImageUpload = (type) => {
  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Fetch user profile on component mount

  const token = localStorage.getItem("authToken");
  if (!token) {
    toast.error("No token found, please log in again.");
    return;
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await customFetch(`/${type}`);

        if (response.data.success) {
          if ((type === "user")) {
            setProfileImage(response.data.user.profileImage); // Set the profile image from the backend
          }

          if ((type === "admin")) {
            setProfileImage(response.data.admin.profileImage); // Set the profile image from the backend
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        toast.error("Failed to load profile data.");
      }
    };

    fetchProfileData();
  }, []);

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    setUploading(true);
    try {
      const response = await customFetch.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        const updatedUser = response.data.user; // Get the updated user object
        setProfileImage(updatedUser.profileImage); // Update the profile image in state
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload the image. Please try again.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("An error occurred while uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  return { handleImageUpload, uploading, profileImage };
};

export default useHandleImageUpload;
