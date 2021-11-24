const express = require('express');
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const DATA = [
	// should be a database or something persistant
	{ email: 'test@gmail.com', password: '1234' }, // user data from email-password
	{ email: 'test2@gmail.com', provider: 'facebook' }, // user data from OAuth has no password
];

const app = express();

// Config
const config = { secretOrKey: 'mysecret' };

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Utility functions for checking if a user exists in the DATA array - Note: DATA array is flushed after every restart of server
function FindOrCreate(user) {
	if (CheckUser(user)) {
		// if user exists then return user
		return user;
	} else {
		DATA.push(user); // else create a new user
	}
}

function CheckUser(input) {
	for (var i in DATA) {
		if (
			input.email == DATA[i].email &&
			(input.password == DATA[i].password || DATA[i].provider == input.provider)
		)
			return true;
		// found
		else null; //console.log('no match')
	}
	return false; // not found
}

var opts = {};
opts.jwtFromRequest = function (req) {
	// tell passport to read JWT from cookies
	var token = null;
	console.log('jwt from request a', req.cookies);
	if (req && req.cookies) {
		token = req.cookies['jwt'];
	}
	return token;
};
opts.secretOrKey = config.secretOrKey;

// main authentication, our app will rely on it
passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		console.log('JWT BASED AUTH GETTING CALLED'); // called everytime a protected URL is being served
		if (CheckUser(jwt_payload.data)) {
			return done(null, jwt_payload.data);
		} else {
			// user account doesnt exists in the DATA
			return done(null, false);
		}
	})
);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVER_API_URL = process.env.SERVER_API_URL;
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: SERVER_API_URL + '/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			//console.log(accessToken, refreshToken, profile)
			console.log('GOOGLE BASED OAUTH VALIDATION GETTING CALLED');
			return done(null, profile);
		}
	)
);

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser(function (user, done) {
	console.log('I should have jack ');
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	console.log('I wont have jack shit');
	done(null, obj);
});

// Prompt for selection of account
app.get(
	'/auth/google/',
	passport.authenticate('google', {
		// hd: 'scet.ac.in',
		prompt: 'select_account',
		// session: false,
		scope: ['profile', 'email'],
	})
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		let user = {
			displayName: req.user.displayName,
			name: req.user.name.givenName,
			email: req.user._json.email,
			provider: req.user.provider,
		};

		FindOrCreate(user);
		let secondsToExpire = 300;
		let token = jwt.sign(
			{
				data: user,
			},
			config.secretOrKey,
			{ expiresIn: secondsToExpire }
		); // expiry in seconds
		res.cookie('jwt', token, {
			secure: process.env.NODE_ENV !== 'development',
			httpOnly: false,
			maxAge: secondsToExpire * 1000,
		});
		console.log('jwt', token);
		res.json({ jwt: token });
		// res.redirect(process.env.CLIENT_URL);
	}
);

app.get(
	'/profile',
	passport.authenticate('jwt', { session: false, failureRedirect: '/failure' }),
	(req, res) => {
		// console.log('Data: ', DATA);
		console.log('Success', req.user);
		res.json({ ans: `Welcome user` });
	}
);

app.get('/', (req, res) => {
	console.log('Data: ', DATA);
	console.log('From root, User: ', req.user);
	res.send('root page');
});

app.get('/failure', (req, res) => {
	console.log('failure');
	res.json({ ans: 'This is when anything goes wrong' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Sever listening on port ${port}`);
});
