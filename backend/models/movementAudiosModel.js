const mongoose = require("mongoose");
const languageSchema = require("./languageModel");
const movementSchema = require("./movementModel");

const movAudioSchema = mongoose.Schema({
  audioName: {
    type: String,
  },
  audioImage: {
    type: String,
  },
  mainAudioFile: {
    type: String,
  },
  rationalAudioFile: {
    type: String,
  },
  explanationAudioFile: {
    type: String,
  },
  devotionalAudioFile: {
    type: String,
  },
  introsAudioFile: {
    type: String,
  },
  languages: [
    {
      type: mongoose.Types.ObjectId,
      ref: languageSchema.collection.name,
      required: true,
    },
  ],
  movements: [
    {
      type: mongoose.Types.ObjectId,
      ref: movementSchema.collection.name,
      required: true,
    },
  ],
  devotionalAudioURL: {
    type: String,
  },
  explanationAudioURL: {
    type: String,
  },
  introsAudioURL: {
    type: String,
  },
  mainAudioURL: {
    type: String,
  },
  rationalAudioURL: {
    type: String,
  },
});

module.exports = mongoose.model("movAudio", movAudioSchema);
