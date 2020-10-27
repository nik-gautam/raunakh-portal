var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Authentication config
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

const user = {
  id: '1',
  username: "prakritioctave",
  password: 'ptcreations'
}

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const _user = user.id === id ? user : false;
  done(null, _user)
});


passport.use(new LocalStrategy({
  usernameField: "username"
}, (username, password, done) => {
  if(username === user.username && password === user.password){
    return done(null, user)
  }else{
    return done(null, false)
  }
}))


app.use('/', indexRouter);
app.use('/login', usersRouter);

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
