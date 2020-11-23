const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//! Replace with our route files
const skillsRouter = require('./routes/skills');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

//! Replace with our routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//* Skills route
app.use('/api/skills', skillsRouter);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

module.exports = app;
