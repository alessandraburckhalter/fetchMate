var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const models = require('./models')

var logger = require('morgan');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const store = new SequelizeStore({db: models.sequelize})
store.sync()




// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const usersRouter = require('./routes/user');
const hubRouter = require('./routes/userHub');
const { Sequelize } = require('./models');
//! Replace with our route files

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// Get images
app.use('/uploads', express.static('uploads'))

//! Replace with our routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);


app.use(
    session({
      secret: 'Deejay', // used to sign the cookie
      resave: false, // update session even w/ no changes
      saveUninitialized: false, // always create a session
      store: store,
    }))

//routes
app.use('/api/v3/register', usersRouter)
app.use('/api/v3/hub', hubRouter)




app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
module.exports = app;
