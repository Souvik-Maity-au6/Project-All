const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate")
const { logout ,leaveCompany} = require("../controllers/deleteController");

router.delete("/logout", authenticate, logout)
router.delete("/leave-company/:id", authenticate, leaveCompany)

module.exports = router