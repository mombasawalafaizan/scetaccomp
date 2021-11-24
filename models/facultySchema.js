const mongoose = require('mongoose');

// Defining Schema for faculty
const facultySchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email ID is compulsory for each faculty.'],
		unique: true,
		index: true,
	},
	name: {
		type: String,
		required: [true, 'Please have a name.'],
	},
	designation: {
		type: String,
		required: [true, 'Designation is required.'],
	},
	qualification: {
		type: String,
		required: [true, 'Qualification is required.'],
	},
});

module.exports = mongoose.model('Faculty', facultySchema);
