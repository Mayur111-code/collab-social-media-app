import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

// PUBLIC file upload route — no auth needed
router.post("/file", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded",
    url: req.file.path, // Cloudinary URL
  });
});

export default router;
