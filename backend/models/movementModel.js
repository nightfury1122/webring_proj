const mongoose = require("mongoose");
const languageSchema = require("./languageModel");
const typeSchema = require("./typeModel");
const bookSchema = require("./booksModel");

const movementsSchema = mongoose.Schema({
  movementName: {
    type: String,
  },
  movementImage: {
    type: String,
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: bookSchema.collection.name,
    required: true,
  },
  languages: [
    {
      type: mongoose.Types.ObjectId,
      ref: languageSchema.collection.name,
      required: true,
    },
  ],
  isNew: {
    type: Boolean,
    default: false,
  },
  isUpdated: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("movements", movementsSchema);
