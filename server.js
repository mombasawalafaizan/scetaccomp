const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const passport = require('passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());

// MIDDLEWARES
// Connect with the database
require('./middleware/db');

// ROUTERS
const loginRouter = require('./routers/login');
const studentRouter = require('./routers/student');
const facultyRouter = require('./routers/faculty');

app.use('/auth', loginRouter);
app.use('/api/student', studentRouter);
app.use('/api/faculty', facultyRouter);

app.get('/api', (req, res) => {
	res.json({
		status: 200,
		message: 'Scetaccomp server root page',
	});
});

const Accomps = require('./models/studentExcellence');

app.get('/testdb', (req, res) => {
	// console.log('oledklfasn');
	Accomps.aggregate([
		{
			$lookup: {
				from: 'students',
				localField: 'enrolment',
				foreignField: 'enrolment',
				as: 'Accomplishments',
			},
		},
		{
			$unwind: '$Accomplishments',
		},
		{
			$addFields: {
				Name: '$Accomplishments.name',
				contact: '$Accomplishments.contact',
				'Academic Year': '$Accomplishments.academic_year',
			},
		},
		{
			$project: {
				Accomplishments: 0,
			},
		},
	]).exec((a, b) => {
		console.log('from test', a, b);
	});
	res.status(200).send({ message: `from server` });
});

const authJwt = require('./middleware/authJwt');

app.get('/api/getUser', authJwt.verifyToken, (req, res) => {
	res.json({ user: req.user });
});

//build mode
// app.get('*', (req, res) => {
// 	// res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
// 	res.json({ status: 404, message: 'Invalid API route' });
// });

const port = process.env.PORT;
app.listen(port, () => {
	console.log('Server started at port ', port);
});

module.exports = app;
