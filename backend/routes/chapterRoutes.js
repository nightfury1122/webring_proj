const express = require("express");
const router = express.Router();
const {
  getChapters,
  getChaptersByBook,
  getChaptersByLanguage,
  getChapterByType,
  getChaptersByLanguageAndBook,
} = require("../contollers/chapterController");

router.get("/", getChapters);
router.get("/byBook", getChaptersByBook);
router.get("/byLanguage", getChaptersByLanguage);
router.get("/byType", getChapterByType);
router.get("/byLanguageAndBook", getChaptersByLanguageAndBook);

module.exports = router;
