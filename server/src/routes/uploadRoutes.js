const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const { uploadToCloudinary } = require("../utils/cloudinaryUtils");

const router = express.Router();

/**
 * @route   POST /api/upload
 * @desc    Upload an image or video to Cloudinary
 * @access  Public (can be secured by adding auth middlewares)
 */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Determine resource type based on mimetype (e.g. video/mp4 -> video)
    const isVideo = req.file.mimetype.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, "ai-growth-exa", resourceType);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      resource_type: result.resource_type,
    });
  } catch (error) {
    console.error("Upload route error:", error);
    res.status(500).json({ success: false, message: "Server error during upload" });
  }
});

module.exports = router;
