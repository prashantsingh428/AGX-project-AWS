const express = require("express");
const router = express.Router();

const upload = require("../middlewares/applicationMiddleware");
const { applyForJob } = require("../controllers/applicationControllers");

router.post("/apply", upload.single("resume"), applyForJob);

module.exports = router;
