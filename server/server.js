const express = require('express');
const app = express();
const port = 3000;
const DeckRoutes = require('./Routes/Deck')
const ScoresRoutes = require('./Routes/Scores')

app.use('/deck', DeckRoutes);
app.use('/scores', ScoresRoutes);

app.listen(port, () => {
	console.log(`server started on ${port}`)
});
