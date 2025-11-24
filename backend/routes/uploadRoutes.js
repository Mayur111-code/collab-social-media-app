import express from "express";
import upload from "../middleware/upload.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

router.post("/file", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const buffer = req.file.buffer;

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "collab-project",
    },
    (error, result) => {
      if (error) {
        console.error("Cloudinary error:", error);
        return res.status(500).json({ error: "Upload failed" });
      }

      res.json({ url: result.secure_url });
    }
  );

  stream.end(buffer);
});

export default router;
