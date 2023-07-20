const fs = require('fs');

exports.getScores = async () =>  {
	const data = await fs.readFileSync('./db.json');

	if (data.length) {
		return JSON.parse(data.toString());
	}

	return [];
};

exports.saveScores = async body => {
	const existedValue = await fs.readFileSync('./db.json');

	if (existedValue.length === 0) {
		fs.writeFileSync('./db.json', JSON.stringify([body]));

		return;
	}

	const json = JSON.parse(existedValue.toString());

	json.push(body);

	await fs.writeFileSync('./db.json', JSON.stringify(json));

	return 'Successfully Written to File.';
};

exports.isPayloadValid = body => {
	return body.playerHand && body.playerHand && body.gameResult;
};
