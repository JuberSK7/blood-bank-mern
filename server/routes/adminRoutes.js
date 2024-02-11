const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarListController,
  getHospitalListController,
  getOrgsListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrgController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();
////Create Route

////// Get Donar List

router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController
);

//// Get Hospital List

router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);

/// Get Orgs list

router.get(
  "/orgs-list",
  authMiddleware,
  adminMiddleware,
  getOrgsListController
);

///// Get Delet Donar Record

router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController
);

////////////////Get Delete Hospital recodr
router.delete(
  "/delete-hospital/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospitalController
);

//////////// Get Delete Org Record
router.delete(
  "/delete-org/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrgController
);

module.exports = router;
