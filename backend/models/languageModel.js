const mongoose = require("mongoose");

const languageSchema = mongoose.Schema(
  {
    languageName: {
      type: String,
    },
    languageCode: {
      type: String,
    },
    flagImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("language", languageSchema);
