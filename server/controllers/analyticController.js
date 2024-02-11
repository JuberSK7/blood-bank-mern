const inventoryModel = require("../models/inventoryModel");
const mongoose = require('mongoose');

const bloodGroupDetailsContrller = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    
    await Promise.all(bloodGroups.map(async (bloodGroup) => {
      /////Total In
      const totalIn = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup: bloodGroup,
            inventoryType: 'in',
            organisation,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$quantity' },
          },
        },
      ]);
      
      //////Total Out
      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup: bloodGroup,
            inventoryType: 'out',
            organisation,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$quantity' },
          },
        },
      ]);

      const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
      bloodGroupData.push({
        bloodGroup,
        totalIn: totalIn[0]?.total || 0,
        totalOut: totalOut[0]?.total || 0,
        availableBlood,
      });
    }));

    res.status(200).send({
      success: true,
      message: 'Blood group data fetch successful',
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in blood detail analytics controller",
      error,
    });
  }
};

module.exports = { bloodGroupDetailsContrller };
