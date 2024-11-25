import axios from 'axios';


export const customFetch = axios.create({
  // baseURL: "https://mosque-f2mw.onrender.com/api/v1"
  baseURL: "http://localhost:5000/api/v1"
});



customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect user to login when token is invalid/expired
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
