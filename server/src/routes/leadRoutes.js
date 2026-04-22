const express = require("express");
const {
    createLead
} = require("../controllers/leadController");

const router = express.Router();

// create lead
router.post("/leadcreate", createLead);



module.exports = router;
