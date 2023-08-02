const asyncHandler = require("express-async-handler");
const { LanguageModel } = require("../models/index");

// @desc this controller is getting the available languages
// @desc GET /api/languages

const getLanguage = asyncHandler(async (req, res) => {
  const result = await LanguageModel.find();

  if (result.length === 0) {
    res.status(404).json({ error: "No languages found !" });
  } else {
    const resp = result.map((language) => ({
      languageId: language._id,
      languageName: language.languageName,
      languageCode: language.languageCode,
    }));
    res.status(200).json(resp);
  }
});

module.exports = {
  getLanguage,
};
