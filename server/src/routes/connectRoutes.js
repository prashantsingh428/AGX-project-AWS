const express = require("express");
const { createConnect } = require("../controllers/connectController");

const router = express.Router();

router.post("/connect", createConnect);

module.exports = router;
