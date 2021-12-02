const mongoose = require('mongoose');

// Defining Schema for students
const studentSchema = new mongoose.Schema({
	enrolment: {
		type: String,
		// Rerun the insertion for documents with in place of academic_year use only shift
		// Do this once when you get latest data from college for first year students
		required: [true, 'Enrolment Number is compulsory for each student.'],
		unique: true,
		index: true,
	},
	name: {
		type: String,
		required: [true, 'Please have a name.'],
	},
	contact: {
		type: String,
		required: [true, 'Student must have a contact number'],
	},
	academic_year: {
		type: String,
		required: [true, 'Student must have an academic year.'],
	},
});

module.exports = mongoose.model('Students', studentSchema);
