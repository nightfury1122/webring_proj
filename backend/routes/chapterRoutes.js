const express = require("express");
const router = express.Router();
const {
  getChapters,
  getChaptersByBook,
  getChaptersByLanguage,
  getChaptersByLanguageAndBook,
  chapterAudios,
} = require("../contollers/chapterController");

router.get("/", getChapters);
router.get("/byBook", getChaptersByBook);
router.get("/byLanguage", getChaptersByLanguage);
router.get("/byLanguageAndBook", getChaptersByLanguageAndBook);
router.get("/api/getChapterAudios", chapterAudios);
module.exports = router;
