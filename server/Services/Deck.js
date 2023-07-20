exports.getShuffledDeck = () =>  {
	const deck = createDeck();
	const extendedDeck = extendDeck(deck);

	return shuffleDeck(extendedDeck);
};

const createDeck = () => {
	const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	const types = ['C', 'D', 'H', 'S'];
	let deck = [];

	values.map(value => {
		types.map(type => {
			deck.push(`${value}-${type}`);
		});
	});

	return deck;
};

const extendDeck = deck => {
	let extendedDeck = [];

	for (let i = 0; i < 6; i++) {
		extendedDeck = extendedDeck.concat(deck);
	}

	return extendedDeck;
};

const shuffleDeck = deck => {
	let shuffledDeck = deck;

	for (let index = 0; index < shuffledDeck.length; index++) {
		let randomIndex = Math.floor(Math.random() * shuffledDeck.length);
		let temp = shuffledDeck[index];

		shuffledDeck[index] = shuffledDeck[randomIndex];
		shuffledDeck[randomIndex] = temp;
	}

	return shuffledDeck;
};
