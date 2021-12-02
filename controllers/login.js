const jwt = require('jsonwebtoken');
require('dotenv').config();

const Student = require('../models/studentSchema');
const Faculty = require('../models/facultySchema');

const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const CLIENT_URL = process.env.CLIENT_URL;

const handleLogin = (req, res) => {
	try {
		let email = req.user.emails[0].value;
		let isFaculty =
			/[a-zA-Z]/.test(email[0]) || email.substring(0, 12) == '180420107033'; //This line is just for testing developer as user

		if (isFaculty) {
			Faculty.find({ email: email }, (err, faculty) => {
				if (err || faculty.length == 0) {
					console.log('User FM: error while retrieving faculty data ', err);
					return res.json({
						status: 403,
						message:
							'You must be a registered faculty from computer department.',
					});
				} else {
					console.log({
						id: faculty[0]._id,
						email: faculty[0].email,
						name: faculty[0].name,
						designation: faculty[0].designation,
						qualification: faculty[0].qualification,
						faculty: true,
					});
					let secondsToExpire = 1800; // 5 minutes
					let token = jwt.sign(
						{
							data: {
								id: faculty[0]._id,
								email: faculty[0].email,
								name: faculty[0].name,
								designation: faculty[0].designation,
								qualification: faculty[0].qualification,
								faculty: true,
							},
						},
						JWT_SECRET,
						{ expiresIn: secondsToExpire }
					);
					res.cookie('jwt', token, {
						secure: NODE_ENV !== 'development',
						httpOnly: true,
						maxAge: secondsToExpire * 1000,
					});
					console.log('jwt', token);
					res.redirect(CLIENT_URL);
				}
			});
		} else {
			let enrolment = email.substring(0, 12);
			Student.find({ enrolment: enrolment }, (err, student) => {
				if (err || student.length === 0) {
					console.log('User FM: error while retrieving student data ', err);
					return res.json({
						status: 403,
						message:
							'You must be a registered student from computer department.',
					});
				} else {
					let secondsToExpire = 1800; // 5 minutes
					let token = jwt.sign(
						{
							data: {
								id: student[0]._id,
								enrolment: student[0].enrolment,
								name: student[0].name,
								contact: student[0].contact,
								academic_year: student[0].academic_year,
								faculty: false,
							},
						},
						JWT_SECRET,
						{ expiresIn: secondsToExpire }
					); // expiry in seconds
					res.cookie('jwt', token, {
						secure: NODE_ENV !== 'development',
						httpOnly: true,
						maxAge: secondsToExpire * 1000,
					});
					console.log('jwt', token);
					// res.json({
					// 	status: 200,
					// 	message: 'User authenticated successfully',
					// 	jwt: token,
					// });
					res.redirect(CLIENT_URL);
				}
			});
		}
	} catch (e) {
		console.log('catching from callback of google redirect', e);
		res.send(500).json({ success: false, message: 'No data found' });
	}
	// res.redirect(CLIENT_URL);
};

module.exports = {
	handleLogin: handleLogin,
};
