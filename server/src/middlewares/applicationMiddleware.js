const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ensure folder exists
const uploadDir = "uploads/application";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "application/pdf" ||
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF or DOCX allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter,
});

module.exports = upload;
