const asyncHandler = require('express-async-handler');
const books = require('../models/booksModel');

// @desc this controller is getting the available books 
// @desc GET /api/books

const getBooks = asyncHandler(async (req, res) => {

    const language = req.query.language;
    const type = req.query.type;

    const result = await books.find({ 'languages.languageName': language, 'typeName': type });

    if (result.length === 0) {

        res.status(404).json({ error: 'No books found !' });
    }
    else {

        const resp = result.map((book) => book.name);
        res.status(200).json(resp);

    }

})

module.exports = {
    getBooks
};