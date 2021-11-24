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
					res.json({ status: 500, message: 'Invalid data' });
				} else {
					res.json({ status: 200, message: 'Data added successfully' });
				}
			});
		} catch (error) {
			console.log(`From catch in ${model_name} post request: ${err}`);
			res.json({ status: 500 });
		}
	};
};

const readDataWrapper = (model_name) => {
	return (req, res) => {
		model[model_name].find({}, (err, docs) => {
			if (err) {
				console.log(
					`Error retrieving data from ${model_name} database: 
                    ${err}`
				);
				res.json({ status: 500 });
			} else {
				res.json({ status: 200, data: docs });
			}
		});
	};
};

const updateDataWrapper = (model_name) => {
	return (req, res) => {
		if (req.query.id) {
			model[model_name].findByIdAndUpdate(
				req.query.id,
				{ ...req.body },
				(err, old_doc) => {
					if (err) {
						console.log(
							`Error updating data from ${model_name} database: , ${err}`
						);
						res.send({
							status: 406,
							message: 'No data found with the provided ID',
						});
					} else {
						res.send({
							status: 200,
							message: 'Resource updated successfully',
						});
					}
				}
			);
		} else {
			res.send({ status: 404, message: 'Send ID in the request query params' });
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
					res.send({
						status: 406,
						message: 'No data found with the provided ID',
					});
				} else {
					console.log('bable', doc);
					res.send({ status: 200, message: 'Resource deleted successfully' });
				}
			});
		} else {
			res.send({ status: 404, message: 'Send an ID in the request' });
		}
	};
};

module.exports = {
	deleteDataWrapper: deleteDataWrapper,
	updateDataWrapper: updateDataWrapper,
	readDataWrapper: readDataWrapper,
	createDataWrapper: createDataWrapper,
};
