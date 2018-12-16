var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Basic認証
var basicAuth = require('basic-auth-connect');

// configファイル読込
var app_config = require('./config/config');

//console.log(app_config);

// https://domain/*にアクセスしたときのルート
var indexRouter = require('./routes/index');

// https://domain/users/*にアクセスにアクセスしたときのルート
var imgupRouter = require('./routes/imgup/imgup');

// https://domain/chat/*にアクセスにアクセスしたときのルート
var chatRouter = require('./routes/chat/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/imgup', imgupRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
