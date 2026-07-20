const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();


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
