var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookmarkRouter = require('./routes/bookmark')
var app = express();
var server = require("http").Server(app)
var io = require('socket.io')(server)
app.io = io


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/event', bookmarkRouter)
    // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(req, next) {
    req.io = io;
    next()
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header( 
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  io.origins(cors())

  io.origins('*:*') 
  io.origins('origins' ,'http://localhost:3000') 
  io.origins((origin, callback) => {
    if (origin !== 'http://localhost:3000') {
        return callback('origin not allowed', false);
    }
    callback(null, true);
     });
module.exports = { app: app, server: server };