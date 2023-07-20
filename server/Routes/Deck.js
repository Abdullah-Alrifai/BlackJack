const express = require('express');
const router = express.Router();
const Deck = require('../Controllers/Deck');

router.get('/get', Deck.getDeck);

module.exports = router;
