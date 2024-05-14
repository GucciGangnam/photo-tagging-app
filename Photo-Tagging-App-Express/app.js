var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const { v4: uuidv4 } = require('uuid');

// Configure .env
require('dotenv').config();

var app = express();

// CORS configuration //

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
};
app.use(cors(corsOptions));
// // // // // // // // 



const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@photo-tagging-app.3nz8nn8.mongodb.net/photo_tagging_app?retryWrites=true&w=majority`
main().catch((err) => console.error(err));
async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connected to MongoDB');
    // Get the list of all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    // Log the names of all collections
    collections.forEach((collection) => {
      console.log(collection.name);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
