import axios from 'axios';


export const customFetch = axios.create({
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
