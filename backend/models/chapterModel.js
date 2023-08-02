const mongoose = require("mongoose");
const languageSchema = require("./languageModel");
const typeSchema = require("./typeModel");
const bookSchema = require("./booksModel");

const chapterSchema = mongoose.Schema({
  chapterName: {
    type: String,
  },
  chapterImage: {
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
});

module.exports = mongoose.model("chapters", chapterSchema);
