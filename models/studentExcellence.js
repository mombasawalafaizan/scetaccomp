const mongoose = require('mongoose');

const studentExcellenceSchema = new mongoose.Schema({
	enrolment: {
		type: String,
		required: [true, 'Enrolment Number is compulsory for each student.'],
		index: true,
	},
	category: String,
	type: String,
	title: String,
	level: String,
	details: String,
	sponsor: String,
	host: String,
	venue: String,
	duration: String,
	outcome: String,
	date: Date,
	certificate: String,
	picture: String,
});

module.exports = mongoose.model('student_accomp', studentExcellenceSchema);
