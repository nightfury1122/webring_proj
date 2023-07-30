const asyncHandler = require("express-async-handler");
const { TypesModel } = require("../models/index");

// @desc this controller is getting the available types
// @desc GET /api/types

const getTypes = asyncHandler(async (req, res) => {
  const result = await TypesModel.find();

  if (result.length === 0) {
    res.status(404).json({ error: "No types found !" });
  } else {
    res.status(200).json(result);
  }
});

module.exports = { getTypes };
