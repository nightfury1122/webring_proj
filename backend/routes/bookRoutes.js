const express = require('express');
const router = express.Router();
const {getBooks}=require('../contollers/booksController');

router.get('/', getBooks);

module.exports = router;