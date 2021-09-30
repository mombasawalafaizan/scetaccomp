const passport = require('passport');
const Student = require('../models/studentSchema');
const Faculty = require('../models/facultySchema');
require('dotenv');

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
        let isFaculty =
          /[a-zA-Z]/.test(profile.email[0][0]) ||
          profile.emails[0].value.substring(0, 12) == '180420107033'; //This line is just for testing developer as user

        if (isFaculty) {
          Faculty.find({ email: profile.emails[0].value }, (err, faculty) => {
            if (err || faculty.length == 0) {
              return done(null, false);
            } else {
              return done(null, {
                id: faculty[0]._id,
                name: faculty[0].name,
                // role: role.ADMIN,
              });
            }
          });
        } else {
          let enrolment = profile.emails[0].value.substring(0, 12);
          Student.find({ enrolment: enrolment }, (err, student) => {
            if (err) {
              console.log('User FM: error while retrieving student data ', err);
              return done(null, false);
            } else {
              return done(null, {
                id: student[0]._id,
                name: student[0].name,
              });
            }
          });
        }
      } else {
        return done(null, false);
      }
    }
  )
);
