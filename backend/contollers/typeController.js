const asyncHandler = require('express-async-handler');
const types = require('../models/typeModel');

// @desc this controller is getting the available types 
// @desc GET /api/types

const getTypes = asyncHandler(async (req, res) => {

    const result = await types.find();

    if (result.length === 0) {
        res.status(404).json({ error: 'No types found !' });
    }
    else {
        res.status(200).json(result);
    }
})

module.exports = { getTypes };