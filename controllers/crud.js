const OrganizedEvents = require('../models/facultyOrganized');
const AttendedEvents = require('../models/facultyAttended');
const Publication = require('../models/facultyPublications');
const Accomp = require('../models/studentExcellence');

const model = {
	student_accomp: Accomp,
	organized_event: OrganizedEvents,
	attended_event: AttendedEvents,
	publication: Publication,
};

// Create data
const createDataWrapper = (model_name) => {
	return (req, res) => {
		try {
			const obj = new model[model_name]({
				enrolment: req.user.enrolment, // for student
				email: req.user.email, // for faculty
				...req.body,
			});
			obj.save((err) => {
				if (err) {
					console.log(`Error saving data to ${model_name} database: ${err}`);
					res.status(500).json({ success: false, message: 'Invalid data' });
				} else {
					res
						.status(200)
						.json({ success: true, message: 'Data added successfully' });
				}
			});
		} catch (error) {
			console.log(`From catch in ${model_name} create request: ${err}`);
			res
				.status(500)
				.json({ success: false, message: 'Internal server error' });
		}
	};
};

const readCurrentUserDataWrapper = (model_name) => {
	return (req, res) => {
		const key_field = req.user.faculty
			? { email: req.user.email }
			: { enrolment: req.user.enrolment };
		model[model_name].find(key_field, (err, docs) => {
			if (err) {
				console.log(
					`Error retrieving data for current user with modelname ${model_name}: ${err}`
				);
				res
					.status(500)
					.json({ success: false, message: 'Internal server error' });
			} else {
				res.status(200).json({
					success: true,
					data: docs,
					message: 'Data listed successfully.',
				});
			}
		});
	};
};

const readAllDataWrapper = (model_name) => {
	return (req, res) => {
		// If this is a student or faculty data, we have to send the details of them along with
		// the desired data by performing LEFT OUTER JOIN
		if (req.user) {
			model[model_name]
				.aggregate([
					{
						$lookup: {
							from: req.user.faculty ? 'faculties' : 'students',
							localField: req.user.faculty ? 'email' : 'enrolment',
							foreignField: req.user.faculty ? 'email' : 'enrolment',
							as: 'User',
						},
					},
					{
						$unwind: '$User', // Converting the array User into object
					},
					{
						$addFields: req.user.faculty
							? {
									name: '$User.name',
									designation: '$User.designation',
									qualification: '$User.qualification',
							  }
							: {
									name: '$User.name',
									contact: '$User.contact',
									academic_year: '$User.academic_year',
							  },
					},
					{
						$project: {
							User: 0, // Drop User object
						},
					},
				])
				.exec((err, docs) => {
					if (err) {
						console.log(
							`Error retrieving data from ${model_name} database: 
							${err}`
						);
						res
							.status(500)
							.json({ success: false, message: 'Internal server error' });
					} else {
						res.status(200).json({
							success: true,
							data: docs,
							message: 'Data listed successfully.',
						});
					}
				});
		} else {
			// If not user return all the data
			model[model_name].find({}, (err, docs) => {
				if (err) {
					console.log(
						`Error retrieving data from ${model_name} database: 
						${err}`
					);
					res
						.status(500)
						.json({ success: false, message: 'Internal server error' });
				} else {
					res.status(200).json({
						success: true,
						data: docs,
						message: 'Data listed successfully.',
					});
				}
			});
		}
	};
};

const updateDataWrapper = (model_name) => {
	return (req, res) => {
		if (req.query.id) {
			model[model_name].findByIdAndUpdate(
				req.query.id,
				{ ...req.body },
				(err) => {
					if (err) {
						console.log(
							`Error updating data from ${model_name} database: , ${err}`
						);
						res.status(406).json({
							success: false,
							message: 'No data found with the provided ID',
						});
					} else {
						res.status(200).json({
							success: true,
							message: 'Resource updated successfully',
						});
					}
				}
			);
		} else {
			res.status(404).json({
				success: false,
				message: 'Send ID in the request query params',
			});
		}
	};
};

const deleteDataWrapper = (model_name) => {
	return (req, res) => {
		if (req.query.id) {
			model[model_name].findByIdAndDelete(req.query.id, (err, doc) => {
				if (err) {
					console.log(
						`Error deleting data from ${model_name} database: , ${err}`
					);
					res.status(406).json({
						success: false,
						message: 'No data found with the provided ID',
					});
				} else {
					res.status(200).json({
						success: true,
						message: 'Resource updated successfully',
					});
				}
			});
		} else {
			res.status(404).json({
				success: false,
				message: 'Send ID in the request query params',
			});
		}
	};
};

module.exports = {
	deleteDataWrapper: deleteDataWrapper,
	updateDataWrapper: updateDataWrapper,
	readAllDataWrapper: readAllDataWrapper,
	readCurrentUserDataWrapper: readCurrentUserDataWrapper,
	createDataWrapper: createDataWrapper,
};
