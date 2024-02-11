const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
/// Register Post Method
router.post("/register", registerController);

/// Login Post Method

router.post("/login", loginController);

//// Get Current User
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
