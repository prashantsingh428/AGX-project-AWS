const express = require("express");
const { submitServiceInquiry, getServices, searchServices } = require("../controllers/serviceController");

const router = express.Router();

router.get("/", getServices);
router.get("/search", searchServices);
router.post("/submit", submitServiceInquiry);

module.exports = router;
