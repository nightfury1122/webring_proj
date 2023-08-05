const asyncHandler = require("express-async-handler");
const {
  MovementsModel,
  BooksModel,
  LanguageModel,
} = require("../models/index");
const booksModel = require("../models/booksModel");
const languageModel = require("../models/languageModel");

// @desc this controller is getting the available movements and chapters
// @desc GET /api/mvmts&chaps

const getMovements = asyncHandler(async (req, res) => {
  const result = await MovementsModel.find();
  console.log(result);
  if (result.length === 0) {
    res.status(404).json({ error: "No movements or chapters found !" });
  } else {
    const resp = result.map((mov) => ({
      movementId: mov._id,
      movementName: mov.movementName,
      movementImage: mov.movementImage,
    }));
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by book search
// @desc GET /api/mvmts&chaps

const getMovementByBook = asyncHandler(async (req, res) => {
  const bookParam = req.query.book.trim();
  const book = await BooksModel.find({ bookName: bookParam });
  if (!book) {
    return [];
  }
  console.log(book);
  const result = await MovementsModel.find({ book: book[0]._id });
  if (result === 0) {
    res.status(404).json({ error: "no movements !" });
  } else {
    const resp = result.map((mov) => ({
      movementId: mov._id,
      movementName: mov.movementName,
      movementImage: mov.movementImage,
    }));
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by language search
// @desc GET /api/mvmts&chaps

const getMovementByLanguage = asyncHandler(async (req, res) => {
  const languageParam = req.query.language.trim();
  const language = await LanguageModel.find({ languageCode: languageParam });
  if (!language) {
    return [];
  }

  const result = await MovementsModel.find({ languages: language[0]._id });
  if (result === 0) {
    res.status(404).json({ error: "no movements or chapters found !" });
  } else {
    const resp = result.map((mov) => ({
      movementId: mov._id,
      movementName: mov.movementName,
      movementImage: mov.movementImage,
    }));
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by language and book search
// @desc GET /api/mvmts&chaps
const getMovementByLanguageAndBook = asyncHandler(async (req, res) => {
  const languageParam = req.query.language.trim();
  const language = await LanguageModel.find({ languageCode: languageParam });
  if (!language) {
    return [];
  }

  const bookParam = req.query.bookId.trim();
  const book = await BooksModel.find({ _id: bookParam });
  if (!book) {
    return [];
  }
  const result = await MovementsModel.find({
    languages: language[0]._id,
    book: book[0]._id,
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
      data: result.map((mov) => ({
        movementId: mov._id,
        movementName: mov.movementName,
        movementImage: mov.movementImage,
        isNew: mov.isNew,
        isUpdated: mov.isUpdated,
      })),
    };
    res.status(200).json(resp);
  }
});
module.exports = {
  getMovements,
  getMovementByBook,
  getMovementByLanguage,
  getMovementByLanguageAndBook,
};
