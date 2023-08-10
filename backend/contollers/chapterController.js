const asyncHandler = require("express-async-handler");
const {
  ChaptersModel,
  BooksModel,
  LanguageModel,
  chapAudioModel,
} = require("../models/index");
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

const chapterAudios = asyncHandler(async (req, res, next) => {
  const chapterIdParam = req.query.chapter_id.trim();

  if (!chapterIdParam) {
    return res
      .status(400)
      .json({ message: "chaptertId query param is required" });
  }
  const chapter_id = await ChaptersModel.find({ _id: chapterIdParam });
  const languageParam = req.query.language.trim();
  if (!languageParam) {
    return res
      .status(400)
      .json({ message: "Language query param is required" });
  }
  const language = await LanguageModel.find({ languageCode: languageParam });
  const result = await chapAudioModel.find({
    chapters: chapter_id[0]._id,
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
      data: result.map((aud) => ({
        audioId: aud._id,
        audioName: aud.audioName,
        audioImage: aud.audioImage,
        mainAudioFile: aud.mainAudioFile,
        rationalAudioFile: aud.rationalAudioFile,
        explanationAudioFile: aud.explanationAudioFile,
        devotionalAudioFile: aud.devotionalAudioFile,
        introsAudioFile: aud.introsAudioFile,
        mainAudioFileURL: aud.mainAudioURL,
        rationalAudioFileURL: aud.rationalAudioURL,
        explanationAudioFileURL: aud.explanationAudioURL,
        devotionalAudioFileURL: aud.devotionalAudioURL,
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
  chapterAudios,
};
