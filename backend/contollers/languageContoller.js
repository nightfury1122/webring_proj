const asyncHandler = require("express-async-handler");
const { LanguageModel } = require("../models/index");

// @desc this controller is getting the available languages
// @desc GET /api/languages

const getLanguage = asyncHandler(async (req, res) => {
  const result = await LanguageModel.find();
  let resp = {};
  if (result.length === 0) {
    resp = {
      status: false,
      data: [],
    };
    res.status(404).json(resp);
  } else {
    resp = {
      status: true, // You can set this to true or false based on your requirement
      data: result.map((language) => ({
        languageId: language._id, // Assuming languageId is the ObjectId field
        languageCode: language.languageCode,
        languageName: language.languageName.toLowerCase(), // Converting to lowercase as per your format
        flagImage: "", // You can set this to an empty string or provide the actual flagImage value if available
      })),
    };
    res.status(200).json(resp);
  }
});

module.exports = {
  getLanguage,
};
