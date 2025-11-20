import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/file", authMiddleware, upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded",
    url: req.file.path   // Cloudinary URL
  });
});

export default router;
