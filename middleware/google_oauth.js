const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

// Required for authenticating the user for login
passport.serializeUser(function (user, cb) {
	cb(null, user);
});

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
			if (profile._json.hd == 'scet.ac.in') {
				return done(null, profile);
			} else {
				// If the user is not from SCET, throw an error
				return done(null, false);
			}
		}
	)
);
