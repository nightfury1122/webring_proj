const asyncHandler = require("express-async-handler");
const { BooksModel, LanguageModel, TypesModel } = require("../models/index");
const booksModel = require("../models/booksModel");
const typeModel = require("../models/typeModel");

// @desc this controller is getting the available books by their types and language
// @desc GET /api/books

const getBooks = asyncHandler(async (req, res) => {
  const result = await booksModel.find();
  if (result.length === 0) {
    res.status(404).json({ error: "no books found !" });
  } else {
    const resp = result.map((book) => book.name);
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available books by their language
// @desc GET /api/books

const getBooksByLanguage = asyncHandler(async (req, res) => {
  const languageParam = req.query.language.trim();
  const language = await LanguageModel.find({ name: languageParam });
  if (!language) {
    return [];
  }
  const result = await BooksModel.find({ languages: language[0]._id });

  if (result.length === 0) {
    res.status(404).json({ error: "No books found !" });
  } else {
    const resp = result.map((book) => book.name);
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available books by their type
// @desc GET /api/books

const getBooksByType = asyncHandler(async (req, res) => {
  const typeParam = req.query.type.trim();
  const type = await TypesModel.find({ type_name: typeParam });
  if (!type) {
    return [];
  }
  const result = await BooksModel.find({ type: type[0]._id });

  if (result.length === 0) {
    res.status(404).json({ error: "No books found !" });
  } else {
    const resp = result.map((book) => book.name);
    res.status(200).json(resp);
  }
});

module.exports = {
  getBooks,
  getBooksByLanguage,
  getBooksByType,
};
