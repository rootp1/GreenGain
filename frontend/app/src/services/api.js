import axios from "axios";

// For API 1
export const api1 = axios.create({
  baseURL: "https://api-jdcq.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// For API 2
export const api2 = axios.create({
  baseURL: "https://ml-pzt6.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});
