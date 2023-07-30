const mongoose = require("mongoose");
const languageSchema = require("./languageModel");
const typeSchema = require("./typeModel");
const bookSchema = mongoose.Schema({
  name: {
    type: String,
  },
  languages: [
    {
      type: mongoose.Types.ObjectId,
      ref: languageSchema.collection.name,
      required: true,
    },
  ],

  type: {
    type: mongoose.Types.ObjectId,
    ref: typeSchema.collection.name,
    required: true,
  },
});

module.exports = mongoose.model("books", bookSchema);

// module.exports = mongoose.model("books", bookSchema).find({}).populate("languages").exec().then();
