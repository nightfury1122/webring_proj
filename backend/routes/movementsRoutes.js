const express = require("express");
const router = express.Router();
const {
  getMovements,
  getMovementByBook,
  getMovementByLanguage,
  getMovementByType,
  getMovementByLanguageAndBook,
} = require("../contollers/movementController");

router.get("/", getMovements);
router.get("/byBook", getMovementByBook);
router.get("/byLanguage", getMovementByLanguage);
router.get("/byType", getMovementByType);
router.get("/byLanguageAndBook", getMovementByLanguageAndBook);

module.exports = router;
