const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//* Route Files
const skillsRouter = require('./routes/skills');
const projectsRouter = require('./routes/projects');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

//! Replace with our routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//* Skills route for getting available skills --> think profile page and project initiation page
app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/projects', projectsRouter);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

module.exports = app;
