const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;
// const url =
// 	'mongodb+srv://faizan:F%40izanmom6@cluster0.yk1bn.mongodb.net/test?retryWrites=true&w=majority';

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
