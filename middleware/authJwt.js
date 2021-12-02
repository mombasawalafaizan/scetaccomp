const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
	if (req && req.cookies) {
		let token = req.cookies['jwt'];

		if (!token) {
			return res.json({
				status: 403,
				message: 'No token provided!',
			});
		} else {
			jwt.verify(token, JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						success: false,
						message: 'Unauthorized access!',
					});
				}
				console.log('from verify token in authJwt', decoded.data);
				req.user = decoded.data;
				next();
			});
		}
	} else {
		res.json({ status: 401, message: 'Your are not logged in' });
		// res.redirect('/auth/google');
	}
};

const isFaculty = (req, res, next) => {
	if (req.user.faculty === true) {
		next();
	} else {
		res.status(403).json({
			success: false,
			message: 'Require Faculty Role!',
		});
	}
};

const isStudent = (req, res, next) => {
	if (req.user.faculty === false) {
		next();
	} else {
		res.status(403).json({
			success: false,
			message: 'Require Student Role!',
		});
	}
};

const authJwt = {
	verifyToken: verifyToken,
	isFaculty: isFaculty,
	isStudent: isStudent,
};

module.exports = authJwt;
