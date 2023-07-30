const express = require("express");
const router = express.Router();
const {
  getMvmtsChaps,
  getMvmtsChapsByBook,
  getMvmtsChapsByLanguage,
  getMvmtsChapsByType,
} = require("../contollers/mvmtsChapsController");

router.get("/", getMvmtsChaps);
router.get("/byBook", getMvmtsChapsByBook);
router.get("/byLanguage", getMvmtsChapsByLanguage);
router.get("/byType", getMvmtsChapsByType);

module.exports = router;
