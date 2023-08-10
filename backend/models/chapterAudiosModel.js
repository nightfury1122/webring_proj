const mongoose = require("mongoose");
const languageSchema = require("./languageModel");
const chapterSchema = require("./chapterModel");

const chapAudioSchema = mongoose.Schema({
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
  chapters: [
    {
      type: mongoose.Types.ObjectId,
      ref: chapterSchema.collection.name,
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

module.exports = mongoose.model("chapAudio", chapAudioSchema);
