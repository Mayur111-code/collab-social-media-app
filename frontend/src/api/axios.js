import axios from "axios";

// ⭐ Use production URL when deployed, localhost when running locally
const API = axios.create({
  baseURL:
    import.meta.env.PROD
      ? "https://collab-backend-7sua.onrender.com/api"   // Render backend
      : "http://localhost:5000/api",                     // Local backend
});

// ⭐ Auto add token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
