const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();

// Initialize Google Oauth strategy
require('../middleware/google_oauth');

const CLIENT_URL = process.env.CLIENT_URL;
const { handleLogin } = require('../controllers/login');

router.get('/login/error', (req, res) => {
	// Redirect to client error page URL after implementation
	res.redirect(CLIENT_URL);
	// res.json({ status: 401, message: 'A scet email id is required' });
});

// Prompt for selection of account
router.get(
	'/google',
	passport.authenticate('google', {
		hd: 'scet.ac.in',
		prompt: 'select_account',
		// prompt: 'none', // For testing purpose
		// login_hint: '180420107033.co18s1@scet.ac.in', // For testing purpose
		scope: ['profile', 'email'],
	})
);

// After selecting account,
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/auth/login/error' }),
	handleLogin
);

module.exports = router;
