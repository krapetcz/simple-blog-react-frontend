// axios.ts
// Axios instance configured for communicating with the Flask REST API backend.
// Automatically attaches the JWT token to outgoing requests and handles token expiration in responses.

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api", // Base URL for the API
});

// REQUEST INTERCEPTOR: Adds JWT token from localStorage to the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR – handles 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      
      const msg = error.response.data?.msg || error.response.data?.error;

      if (msg && msg.toLowerCase().includes("token has expired")) {
        console.warn("Token has expired, logging out...");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
