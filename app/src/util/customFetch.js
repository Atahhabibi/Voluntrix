import axios from "axios";

// Create an Axios instance with the base URL from Vite's environment variables
// export const customFetch = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"
// });
export const customFetch = axios.create({
  baseURL:
    "https://mosque-f2mw.onrender.com/api/v1" || "http://localhost:5000/api/v1"
});

// Request Interceptor to Add Token Dynamically
customFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Fetch token dynamically
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor to Handle Errors
customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error); // Reject the promise for other errors
  }
);

const token = localStorage.getItem("authToken"); // Fetch token dynamically

export const customFetchForAll = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  headers:{
   Authorization:`Bearer ${token}`
  }
});
