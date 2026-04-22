


const express = require("express");
const uploadBlog = require("../middlewares/uploadBlog");
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const router = express.Router();

router.post("/", uploadBlog.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", uploadBlog.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;

