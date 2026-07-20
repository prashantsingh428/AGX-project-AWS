const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from Multer
 * @param {String} folderName - The folder name in Cloudinary to store the file
 * @param {String} resourceType - The type of resource ('image', 'video', 'raw', or 'auto')
 * @returns {Promise<Object>} - The Cloudinary upload response object
 */
const uploadToCloudinary = (fileBuffer, folderName = "general", resourceType = "auto") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to readable stream and pipe it to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = {
  uploadToCloudinary,
};
