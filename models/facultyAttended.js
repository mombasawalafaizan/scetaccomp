const mongoose = require('mongoose');

// Events attended by faculty
const facultyAttendedSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is necessary.'],
		index: true,
	},
	type: String,
	title: String,
	sponsor: String,
	faculty_participants: Number,
	date: Date,
	duration: String,
	host: String,
	certificate: String,
	outcome: String,
	remarks: String,
});

module.exports = mongoose.model('attended_event', facultyAttendedSchema);
