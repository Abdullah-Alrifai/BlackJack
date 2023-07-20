const DeckService = require('../Services/Deck');

exports.getDeck = async (req, res) => {
	try {
		const deck = DeckService.getShuffledDeck();

		res.status(200).json({ deck });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: 'an error occurred'});
	}
};
