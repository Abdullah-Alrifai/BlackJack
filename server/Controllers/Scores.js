const ScoresService = require('../Services/Scores');

exports.getScores = async (req, res) => {
	try {
		const scores = await ScoresService.getScores();

		res.status(200).json({ scores });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: 'an error occurred'});
	}
};

exports.saveScores = async (req, res) => {
	try {
		if (ScoresService.isPayloadValid(req.body)) {
			const result =  await ScoresService.saveScores(req.body);

			res.status(200).json({ result });

			return;
		}

		res.status(400).json({ message: 'bad request' });

	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: 'an error occurred'});
	}
};
