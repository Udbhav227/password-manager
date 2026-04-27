const express = require("express");
const router = express.Router();
const {
  addPassword,
  getPasswords,
  updatePassword,
  deletePassword,
} = require("../controllers/passController");
const verifyToken = require("../middleware/auth");

router.post("/add", verifyToken, addPassword);
router.get("/", verifyToken, getPasswords);
router.put("/:id", verifyToken, updatePassword);
router.delete("/:id", verifyToken, deletePassword);

module.exports = router;
