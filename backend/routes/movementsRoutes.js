const express = require("express");
const router = express.Router();
const {
  getMovements,
  getMovementByBook,
  getMovementByLanguage,
  getMovementByType,
  getMovementByLanguageAndBook,
  movementAudios,
} = require("../contollers/movementController");

router.get("/", getMovements);
router.get("/byBook", getMovementByBook);
router.get("/byLanguage", getMovementByLanguage);
router.get("/byLanguageAndBook", getMovementByLanguageAndBook);
router.get("/api/getMovementAudios", movementAudios);

module.exports = router;
