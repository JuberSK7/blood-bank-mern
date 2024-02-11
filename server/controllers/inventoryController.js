const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("req.body", req.body);

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    //   if( inventoryType === "in" && user.role !== "donar"){
    //    throw new Error("Not a donar account")
    //   }
    //   if( inventoryType === "out" && user.role !== "hospital"){
    //     throw new Error("Not a hospital")
    //    }
    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      /// Totale in
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log('Total in', totalInOfRequestedBlood);

      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      //Total Out

      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

      const availableQuantityOfBloodGroup = totalIn - totalOut;
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup} ml of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Inventory API",
      error,
    });
  }
};

///Get All Blood Record
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get All inventry successfull",
      inventory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get all inventory",
      error,
    });
  }
};

///Get Inventory Hospital Record
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital cunsumer record  successfull",
      inventory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get cunsumer all inventory",
      error,
    });
  }
};

/// Get Recent Inventory Controller

const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.succes(200).send({
      success: true,
      message: "Recent Inventory Get Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Recent Inventory API",
      error,
    });
  }
};

//////Get Donar

const getDonarController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const donarId = await inventoryModel.distinct("donar", {
      organisation,
    });
    const donars = await userModel.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "Donar Response sucessfullu",
      donars,
    });
    // console.log(donarId);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar Recods",
      error,
    });
  }
};

//////Get Hospital

const getHospitelController = async (req, res) => {
  try {
    const organisation = await req.body.userId;
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    ///FInd Hospital(id)
    const hospital = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).send({
      success: true,
      message: "Hospital Response sucessfullu",
      hospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital records",
      error,
    });
  }
};

//////get oragnisation Controller

const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });
    ///find organisation
    const organisations = await userModel.find({ _id: { $in: orgId } });
    return res.status(200).send({
      success: true,
      message: " Hospital Organisation Response Sucessfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error inHospital Organisation Records",
      error,
    });
  }
};

const getOrganisationForHospitalControlller = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });

    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital org Data fechded",
      organisations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Hospital Api",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitelController,
  getOrganisationController,
  getOrganisationForHospitalControlller,
  getInventoryHospitalController,
  getRecentInventoryController,
};
