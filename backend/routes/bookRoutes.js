const express = require("express");
const router = express.Router();
const {
  getBooksByLanguage,
  getBooks,
  getBooksByType,
  getBooksByTypeAndLanguage,
} = require("../contollers/booksController");
router.get("/", getBooks);
router.get("/byLanguage", getBooksByLanguage);
router.get("/byType", getBooksByType);
router.get("/byTypeAndLanguage", getBooksByTypeAndLanguage);


module.exports = router;
