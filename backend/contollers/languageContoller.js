const asyncHandler = require('express-async-handler');
const language = require('../models/languageModel');

// @desc this controller is getting the available languages 
// @desc GET /api/languages

const getLanguage = asyncHandler(async (req, res) => {

    const result = await language.find();

    if (result.length === 0) {
        res.status(404).json({ error: 'No languages found !' });
    }
    else {

        res.status(200).json(result);

    }
}
)

module.exports = {
    getLanguage
};