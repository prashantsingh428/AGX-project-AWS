const multer = require("multer");

// Use memory storage to avoid saving files to disk
// Files will be stored in req.file.buffer
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Limit to 50MB per file
  }
});

module.exports = upload;
