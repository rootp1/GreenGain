import axios from "axios";
export const api1 = axios.create({
  baseURL: "https://api-jdcq.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const api2 = axios.create({
  baseURL: "https://ml-pzt6.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});
