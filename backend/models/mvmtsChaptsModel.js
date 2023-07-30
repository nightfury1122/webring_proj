const mongoose = require("mongoose");
const languageSchema = require("./languageModel");
const typeSchema = require("./typeModel");
const bookSchema = require("./booksModel");

const mvmtsChapsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: bookSchema.collection.name,
    required: true,
  },
  type: {
    type: mongoose.Types.ObjectId,
    ref: typeSchema.collection.name,
    required: true,
  },

  languages: [
    {
      type: mongoose.Types.ObjectId,
      ref: languageSchema.collection.name,
      required: true,
    },
  ],
});

module.exports = mongoose.model("mvmtsChaps", mvmtsChapsSchema);
