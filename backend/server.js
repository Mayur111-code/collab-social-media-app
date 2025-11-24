import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://infinahub.web.app",   // ← ADD THIS
    "https://infinahub.firebaseapp.com"  // ← ADD THIS TOO
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ---------------- ROUTES ----------------
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import developerRoute from "./routes/developerRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// ⭐ Correct Order (Express 5 required)
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/developers", developerRoute);
app.use("/api/collab", collabRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);   // put search before user
app.use("/api/user", userRoutes);       // user last due to /:id

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Collab API Server Running",
    version: "1.0.0",
    frontend: "https://infinahub.netlify.app"
  });
});

// ⭐ NO wildcard (*), NO complicated CORS — Render safe!
// DO NOT ADD app.use("*")

// ⭐ Start Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
