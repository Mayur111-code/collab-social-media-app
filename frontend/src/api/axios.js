import axios from "axios";

// ⭐ Use production URL when deployed, localhost when running locally
const API = axios.create({
  baseURL:
     "http://localhost:3000/api",                     
});

// ⭐ Auto add token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
