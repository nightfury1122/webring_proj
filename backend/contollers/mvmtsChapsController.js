const asyncHandler = require("express-async-handler");
const {
  MvmtsChaptersModel,
  BooksModel,
  LanguageModel,
  TypesModel,
} = require("../models/index");
const booksModel = require("../models/booksModel");

// @desc this controller is getting the available movements and chapters
// @desc GET /api/mvmts&chaps

const getMvmtsChaps = asyncHandler(async (req, res) => {
  const result = await MvmtsChaptersModel.find();

  if (result.length === 0) {
    res.status(404).json({ error: "No movements or chapters found !" });
  } else {
    const resp = result.map((item) => item.name);
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by book search
// @desc GET /api/mvmts&chaps

const getMvmtsChapsByBook = asyncHandler(async (req, res) => {
  const bookParam = req.query.book.trim();
  const book = await BooksModel.find({ name: bookParam });
  if (!book) {
    return [];
  }

  const result = await MvmtsChaptersModel.find({ book: book[0]._id });
  if (result === 0) {
    res.status(404).json({ error: "no movements or chapters found !" });
  } else {
    const resp = result.map((movsandchap) => movsandchap.name);
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by language search
// @desc GET /api/mvmts&chaps

const getMvmtsChapsByLanguage = asyncHandler(async (req, res) => {
  const languageParam = req.query.language.trim();
  const language = await LanguageModel.find({ name: languageParam });
  if (!language) {
    return [];
  }

  const result = await MvmtsChaptersModel.find({ languages: language[0]._id });
  if (result === 0) {
    res.status(404).json({ error: "no movements or chapters found !" });
  } else {
    const resp = result.map((movsandchap) => movsandchap.name);
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by language search
// @desc GET /api/mvmts&chaps

const getMvmtsChapsByType = asyncHandler(async (req, res) => {
  const typeParam = req.query.type.trim();
  const type = await TypesModel.find({ type_name: typeParam });
  if (!type) {
    return [];
  }

  const result = await MvmtsChaptersModel.find({ type: type[0]._id });
  if (result === 0) {
    res.status(404).json({ error: "no movements or chapters found !" });
  } else {
    const resp = result.map((movsandchap) => movsandchap.name);
    res.status(200).json(resp);
  }
});
module.exports = {
  getMvmtsChaps,
  getMvmtsChapsByBook,
  getMvmtsChapsByLanguage,
  getMvmtsChapsByType,
};
