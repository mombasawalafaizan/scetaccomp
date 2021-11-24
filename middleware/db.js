const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	autoIndex: true,
};

mongoose
	.connect(url, connectionParams)
	.then(() => {
		console.log('Connected to database ');
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
		process.exit(1);
	});

module.exports = mongoose;
