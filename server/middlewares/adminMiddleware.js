const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);

    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "auth failed",
      });
    } else {
      //or furthur execution
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Auth Error In Admin API",
      error,
    });
  }
};
