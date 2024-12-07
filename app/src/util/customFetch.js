import axios from "axios";
const BASE_URL ="https://mosque-f2mw.onrender.com/api/v1" || "http://localhost:5000/api/v1"

export const customFetch = axios.create({
  baseURL:BASE_URL,
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


export const customFetchForAll = axios.create({
  baseURL: BASE_URL,
});

customFetchForAll.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error("Error from /taskEventForAll:", error.response?.data || error.message);
    return Promise.reject(error); 
  }
);