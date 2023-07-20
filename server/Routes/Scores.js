const express = require('express');
const router = express.Router();
const ScoresController = require('../Controllers/Scores');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json()

router.get('/get', ScoresController.getScores);
router.post('/save', jsonParser, ScoresController.saveScores);

module.exports = router;
