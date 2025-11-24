import { v2 as cloudinary } from "cloudinary";

router.post("/file", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "collab-project" },
      (error, uploadResult) => {
        if (error) return res.status(500).json({ error });

        res.json({
          message: "File uploaded",
          url: uploadResult.secure_url
        });
      }
    );

    result.end(req.file.buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload error" });
  }
});
