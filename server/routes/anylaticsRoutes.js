const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  bloodGroupDetailsContrller,
} = require("../controllers/analyticController");

const router = express.Router();

//// Get Blood Data
router.get("/bloodGroupdata", authMiddleware, bloodGroupDetailsContrller);

module.exports = router;
