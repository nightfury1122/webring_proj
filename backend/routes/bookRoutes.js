const express = require("express");
const router = express.Router();
const {
  getBooksByLanguage,
  getBooks,
  getBooksByType,
} = require("../contollers/booksController");
router.get("/", getBooks);
router.get("/byLanguage", getBooksByLanguage);
router.get("/byType", getBooksByType);

module.exports = router;
