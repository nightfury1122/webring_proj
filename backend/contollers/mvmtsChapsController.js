const asyncHandler = require('express-async-handler');
const mvmtschaps = require('../models/mvmtsChaptsModel');

// @desc this controller is getting the available movements and chapters 
// @desc GET /api/mvmts&chaps

const getMvmtsChaps = asyncHandler(async (req, res) => {

    const book = req.query.book;
    const language = req.query.language;

    const result = await mvmtschaps.find({ 'languages.languageName': language, 'bookName': book });
    console.log(result)

    if (result.length === 0) {

        res.status(404).json({ error: 'No movements or chapters found !' });
    }
    else {

        const resp = result.map((item) => item.name);
        res.status(200).json(resp);

    }
})

module.exports = { getMvmtsChaps };