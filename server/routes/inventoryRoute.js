const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitelController,
  getOrganisationController,
  getOrganisationForHospitalControlller,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

/// ADD Inventory post

router.post("/create-inventory", authMiddleware, createInventoryController);

/// GET all blood record

router.get("/get-inventory", authMiddleware, getInventoryController);

/// GET recent blood record

router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

////Get Hospital blood record

router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

//// Get Donar record
router.get("/get-donars", authMiddleware, getDonarController);

//// Get Donar record
router.get("/get-hospital", authMiddleware, getHospitelController);

//// Get Donar record
router.get("/get-organisation", authMiddleware, getOrganisationController);

//// Get Donar record
router.get(
  "/get-organisation-for-hospital",
  authMiddleware,
  getOrganisationForHospitalControlller
);

module.exports = router;
