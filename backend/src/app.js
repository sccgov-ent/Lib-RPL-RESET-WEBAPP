const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api');

require('dotenv').config();

//var path = require('path');
//var express = require('express');
var session = require('express-session');
var createError = require('http-errors');

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

const app = express();

/**
 * Using express-session middleware for persistent user session. Be sure to
 * familiarize yourself with available options. Visit: https://www.npmjs.com/package/express-session
 */
 app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // set this to true on production
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.json());
app.use(cors());

// Mount API routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use('/api', apiRouter);

// Serve frontend build if present
const frontendBuild = path.join(__dirname, '..', '..', 'frontend', 'build');
app.use(express.static(frontendBuild));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendBuild, 'index.html'));
});

module.exports = app;
