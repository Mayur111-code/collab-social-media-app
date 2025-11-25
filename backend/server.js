import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";   

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "collab-social-media-app.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import developerRoute from "./routes/developerRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/developers", developerRoute);
app.use("/api/collab", collabRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/user", userRoutes);

// Root
app.get("/", (req, res) => {
  res.json({
    message: "Collab API Server Running",
    version: "1.0.0",
    frontend: "https://infinahub.web.app",
  });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
