const express = require("express");
const router = express.Router();
const { getLanguage } = require("../contollers/languageContoller");

router.get("/", getLanguage);

module.exports = router;
