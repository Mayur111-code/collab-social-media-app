import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import developerRoute from "./routes/developerRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";  
import searchRoutes from "./routes/searchRoutes.js";


// use routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/developers", developerRoute);
app.use("/api/collab", collabRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);   // ⭐ ADD THIS LINE

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
