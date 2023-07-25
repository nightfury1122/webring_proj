const express = require('express');
const router = express.Router();
const { getTypes } = require('../contollers/typeController');

router.get('/', getTypes);

module.exports = router;