const Accomp = require('../models/studentExcellence');

const getCurrentStudentAccomplishment = (req, res) => {
	Accomp.find({ enrolment: req.user.enrolment }, (err, docs) => {
		if (err) {
			console.log(
				"Error retrieving data for current student's accomplishments: ",
				err
			);
			res.json({ status: 500 });
		} else {
			res.json({ status: 200, data: docs });
		}
	});
};

module.exports = {
	getCurrentStudentAccomplishment: getCurrentStudentAccomplishment,
};
