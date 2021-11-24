const mongoose = require('mongoose');

// Events attended by faculty
const facultyPublicationSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is necessary.'],
		index: true,
	},
	type: String,
	title: String,
	coauthor: String,
	status: String,
	published_in: String,
	level: String,
	indexed_at: String,
	ISBN: String,
	impact: String,
	date: Date,
	name: String,
	research_paper: String,
	certificate: String,
	outcome: String,
	remarks: String,
	volume: String,
	page_no: {
		from: Number,
		to: Number,
	},
});

module.exports = mongoose.model('publication', facultyPublicationSchema);
