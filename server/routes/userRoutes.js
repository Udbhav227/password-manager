const express = require('express');
const router = express.Router();
const { getCurrentUser } = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

router.get("/me", verifyToken, getCurrentUser);

module.exports = router;