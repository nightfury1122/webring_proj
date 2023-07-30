const mongoose = require("mongoose");

const languageSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("language", languageSchema);
