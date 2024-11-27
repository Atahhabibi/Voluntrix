import axios from "axios";

// Create an Axios instance with the base URL from Vite's environment variables
export const customFetch = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"
});

// Request Interceptor to Add Token Dynamically
customFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Fetch token dynamically
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found. Redirecting to login...");
    window.location.href = "/login"; // Redirect to login
  }
  return config;
});

// Response Interceptor to Handle Errors
customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken"); // Clear token
      alert("Session expired. Please log in again.");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error); // Reject the promise for other errors
  }
);
