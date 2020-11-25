const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const models = require('./models')

const logger = require('morgan');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const store = new SequelizeStore({db: models.sequelize})
store.sync()

//Route files
const usersRouter = require('./routes/user');
const hubRouter = require('./routes/userHub');
const skillsRouter = require('./routes/skills');
const projectsRouter = require('./routes/projects');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// Get images
app.use('/uploads', express.static('uploads'))


app.use(
    session({
        secret: 'Deejay', // used to sign the cookie
        resave: false, // update session even w/ no changes
        saveUninitialized: false, // always create a session
        store: store,
    }))

//routes
app.use('/api/v1/register', usersRouter)
app.use('/api/v1/hub', hubRouter)
//* Skills route for getting available skills --> think profile page and project initiation page
app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/projects', projectsRouter);




app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
module.exports = app;
