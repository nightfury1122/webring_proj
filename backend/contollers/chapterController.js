const asyncHandler = require("express-async-handler");
const { ChaptersModel, BooksModel, LanguageModel } = require("../models/index");
const booksModel = require("../models/booksModel");
const languageModel = require("../models/languageModel");

// @desc this controller is getting the available movements and chapters
// @desc GET /api/mvmts&chaps

const getChapters = asyncHandler(async (req, res) => {
  const result = await ChaptersModel.find();
  if (result.length === 0) {
    res.status(404).json({ error: "No chapters !" });
  } else {
    const resp = result.map((chap) => ({
      chapterId: chap._id,
      chapterName: chap.chapterName,
      chapterImage: chap.chapterImage,
    }));
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by book search
// @desc GET /api/mvmts&chaps

const getChaptersByBook = asyncHandler(async (req, res) => {
  const bookParam = req.query.book.trim();
  const book = await BooksModel.find({ bookName: bookParam });
  if (!book) {
    return [];
  }

  const result = await ChaptersModel.find({ book: book[0]._id });
  if (result === 0) {
    res.status(404).json({ error: "no chapters !" });
  } else {
    const resp = result.map((chap) => ({
      chapterId: chap._id,
      chapterName: chap.chapterName,
      chapterImage: chap.chapterImage,
    }));
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by language search
// @desc GET /api/mvmts&chaps

const getChaptersByLanguage = asyncHandler(async (req, res) => {
  const languageParam = req.query.language.trim();
  const language = await LanguageModel.find({ languageCode: languageParam });
  if (!language) {
    return [];
  }

  const result = await ChaptersModel.find({ languages: language[0]._id });
  if (result === 0) {
    res.status(404).json({ error: "no chapters !" });
  } else {
    const resp = result.map((chap) => ({
      chapterId: chap._id,
      chapterName: chap.chapterName,
      chapterImage: chap.chapterImage,
    }));
    res.status(200).json(resp);
  }
});

// @desc this controller is getting the available movements and chapters by language search
// @desc GET /api/mvmts&chaps

const getChapterByType = asyncHandler(async (req, res) => {
  const typeParam = req.query.type.trim();
  const type = await TypesModel.find({ type_name: typeParam });
  if (!type) {
    return [];
  }

  const result = await ChaptersModel.find({ type: type[0]._id });
  if (result === 0) {
    res.status(404).json({ error: "no chapters !" });
  } else {
    const resp = result.map((chap) => ({
      chapterId: chap._id,
      chapterName: chap.chapterName,
      chapterImage: chap.chapterImage,
    }));
    res.status(200).json(resp);
  }
});
// @desc this controller is getting the available movements and chapters by language and book search
// @desc GET /api/mvmts&chaps
const getChaptersByLanguageAndBook = asyncHandler(async (req, res) => {
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
  const result = await ChaptersModel.find({
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
      data: result.map((chap) => ({
        chapterId: chap._id,
        chapterName: chap.chapterName,
        chapterImage: chap.chapterImage,
      })),
    };
    res.status(200).json(resp);
  }
});
module.exports = {
  getChapters,
  getChaptersByBook,
  getChaptersByLanguage,
  getChapterByType,
  getChaptersByLanguageAndBook,
};
