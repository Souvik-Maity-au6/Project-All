const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate")
const { leaveCompany} = require("../controllers/updateController");

router.delete("/leave-company/:id", authenticate, leaveCompany)

module.exports = router