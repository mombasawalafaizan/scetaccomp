const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();
const passport = require('passport');

const app = express();

// MongoDBStore for session storage on MongoDB Atlas using URI
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'mySessions',
});

store.on('error', function (error) {
  console.log('Error while creating session: ', error);
});

app.use(
  session({
    cookie: {
      // Save cookie for 1 hour
      maxAge: 1000 * 3600,
    },
    store: store,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MIDDLEWARES
// Connect with the database
require('./middleware/db');
// Initialize authentication resources
require('./middleware/authentication');

// For handling POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Not to be used maybe
// app.use(express.static(path.join(__dirname, 'public')));

// ROUTERS
const loginRouter = require('./routers/login_session');

// Important to note that loginRouter should be used first,
// so that session can be created, and path should always be '/'
// for the session to instantiated on first call to the server
app.use('/auth', loginRouter);

app.get('/', (req, res) => {
  console.log('is authenticated', req.isAuthenticated());
  console.log('from root', req.user ? req.user : 'no user');
  res.send('home page');
});

//build mode
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
  res.send('not a correct url');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server started at port ', port);
});

module.exports = app;
