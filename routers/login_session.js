const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();

const CLIENT_URL = process.env.CLIENT_URL;

router.get('/login/error', (req, res) => {
  res.status(401).send('Error logging in');
});

// For checking if user is authenticated or not
router.get('/checkAuthentication', (req, res) => {
  res.json({ authenticated: req.isAuthenticated(), user: req.user });
});

// Prompt for selection of account
router.get(
  '/google',
  passport.authenticate('google', {
    hd: 'scet.ac.in',
    prompt: 'select_account',
    scope: ['profile', 'email'],
  })
);

// After selecting account,
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login/error' }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  }
);

module.exports = router;
