const mongoose = require('mongoose');

// Events organized by faculty
const facultyOrganizedSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is necessary.'],
		index: true,
	},
	type: String,
	title: String,
	sponsor: String,
	student_participants: Number,
	faculty_participants: Number,
	exp_name: String,
	exp_affiliation: String,
	exp_email: String,
	exp_contact: String,
	venue: String,
	duration: String,
	date: Date,
	report: String,
	picture: String,
	outcome: String,
	remarks: String,
});

module.exports = mongoose.model('organized_event', facultyOrganizedSchema);
