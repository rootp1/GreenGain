import axios from "axios";

// For API 1
export const api1 = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// For API 2
export const api2 = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});
