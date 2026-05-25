import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("adminToken") ||
    JSON.parse(localStorage.getItem("userInfo") || "{}")?.token ||
    JSON.parse(localStorage.getItem("adminInfo") || "{}")?.token ||
    JSON.parse(localStorage.getItem("adminData") || "{}")?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
