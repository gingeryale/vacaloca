var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var meetVaca = require('./routes/vacations');
var myDbHelper = require('./helps/db');
var cors = require('cors');
var bodyParser = require('body-parser');

myDbHelper.createDBAndTables();


var app = express();
app.use(session({
    secret: 'vacaloca',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
app.use(cors());
app.use(bodyParser({limit: '50mb'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/vacations', meetVaca);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
module.exports = app;
