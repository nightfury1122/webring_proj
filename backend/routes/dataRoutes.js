const express = require("express");
const router = express.Router();

const { getData } = require("../contollers/dataController");

router.get("/", getData);

module.exports = router;
