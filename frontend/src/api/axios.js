import axios from "axios";

// Use your Render backend URL here
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://your-backend-app.onrender.com/api"  // Replace with your actual Render URL
    : "http://localhost:5000/api",
});

// Auto attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
