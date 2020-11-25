const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const models = require('./models')
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv")
const logger = require('morgan');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const store = new SequelizeStore({db: models.sequelize})
store.sync()
dotenv.config()

//Route files
const usersRouter = require('./routes/user');
const hubRouter = require('./routes/userHub');
const skillsRouter = require('./routes/skills');
const projectsRouter = require('./routes/projects');
const emailsRouter = require('./routes/email');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
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
app.use('/api/v1/email', emailsRouter);




app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
module.exports = app;
