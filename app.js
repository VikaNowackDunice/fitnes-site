const createError = require('http-errors');
const express = require('express');
const path = require('path');

const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const prisma = require('./prisma');

const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'secret key', resave: true, saveUninitialized: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// passport auth
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new localStrategy(async (login, password, done) => {
    const user = await prisma.users.findFirst({
      where: {
        login,
        password,
      },
    });

    return done(null, user);
  })
);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
