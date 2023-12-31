const asyncHandler = require("express-async-handler");
const { BooksModel, LanguageModel, TypesModel } = require("../models/index");
const booksModel = require("../models/booksModel");
const typeModel = require("../models/typeModel");

// @desc this controller is getting the available books by their types and language
// @desc GET /api/books

const getBooks = asyncHandler(async (req, res) => {
  const result = await booksModel.find();
  let resp = {};
  if (result.length === 0) {
    resp = {
      status: false,
      data: [],
    };
    res.status(404).json(resp);
  } else {
    // const resp = result.map((book) => book.name);
    resp = {
      status: true,
      data: result.map((book) => ({
        bookId: book._id,
        bookName: book.bookName,
        bookImage: book.bookImage,
      })),
    };
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available books by their language
// @desc GET /api/books

const getBooksByLanguage = asyncHandler(async (req, res) => {
  const languageParam = req.query.language.trim();
  const language = await LanguageModel.find({ languageCode: languageParam });
  if (!language) {
    return [];
  }
  const result = await BooksModel.find({
    languages: language[0]._id,
  });

  if (result.length === 0) {
    res.status(404).json({ error: "No books found !" });
  } else {
    const resp = result.map((book) => ({
      bookId: book._id,
      bookName: book.bookName,
      bookImage: book.bookImage,
    }));
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
    const resp = result.map((book) => ({
      bookId: book._id,
      bookName: book.bookName,
      bookImage: book.bookImage,
    }));
    res.status(200).json(resp);
  }
});
// @desc this controller is getting the available books by their type
// @desc GET /api/books
const getBooksByTypeAndLanguage = asyncHandler(async (req, res) => {
  const typeParam = req.query.type.trim();
  const languageParam = req.query.language.trim();

  const type = await TypesModel.find({ type_name: typeParam });
  if (!type) {
    return [];
  }
  const language = await LanguageModel.find({ languageCode: languageParam });
  if (!language) {
    return [];
  }
  const result = await BooksModel.find({
    type: type[0]._id,
    languages: language[0]._id,
  });
  let resp = {};
  if (result.length === 0) {
    resp = {
      status: false,
      data: [],
    };
    res.status(404).json(resp);
  } else {
    resp = {
      status: true,
      data: result.map((book) => ({
        bookId: book._id,
        bookName: book.bookName,
        bookImage: book.bookImage,
        isNew: book.isNew,
        isUpdated: book.isUpdated,
      })),
    };
    res.status(200).json(resp);
  }
});
module.exports = {
  getBooks,
  getBooksByLanguage,
  getBooksByType,
  getBooksByTypeAndLanguage,
};
