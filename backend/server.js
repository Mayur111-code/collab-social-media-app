// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ⭐ SAFE CORS
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://infinahub.netlify.app"
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // ---------------- ROUTES ----------------
// import authRoutes from "./routes/authRoutes.js";
// import postRoutes from "./routes/postRoutes.js";
// import developerRoute from "./routes/developerRoutes.js";
// import collabRoutes from "./routes/collabRoutes.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import searchRoutes from "./routes/searchRoutes.js";

// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/developers", developerRoute);
// app.use("/api/collab", collabRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/search", searchRoutes);

// // ⭐ DO NOT USE HOST — Render will break
// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// ⭐ SAFE CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://infinahub.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// ---------------- ROUTES ----------------
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import developerRoute from "./routes/developerRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";   // 👈 MOVE THIS UP
import userRoutes from "./routes/userRoutes.js";      // 👈 ALWAYS LAST

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/developers", developerRoute);
app.use("/api/collab", collabRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);   // 👈 SEARCH FIRST
app.use("/api/user", userRoutes);       // 👈 USER ROUTE LAST

// ⭐ DO NOT USE HOST — Render will break
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
