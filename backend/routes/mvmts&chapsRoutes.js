const express = require('express');
const router = express.Router();
const {getMvmtsChaps} = require('../contollers/mvmtsChapsController');

router.get('/', getMvmtsChaps);

module.exports = router;