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
  origin: '*', // Allow only requests from this origin
  methods: 'GET,POST', // Allow only specified HTTP methods
  allowedHeaders: 'Authorization,Content-Type', // Allow only specified headers
};
app.use(cors(corsOptions));
// // // // // // // // 


//////// THIS CODE WAS PROVIDED BY MONGOD ATLAS  --- IT ALLOWED ME TO CONNECT BUT NOT TO CREATE COLLECTION USING THE MATHODS IM USING HERE AND HAVE ALWAYS USED ////////////

// // Create connection to mongoDB
// // Required for mongo
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@photo-tagging-app.3nz8nn8.mongodb.net/?retryWrites=true&w=majority&appName=Photo-Tagging-App`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     const database = client.db("photo_tagging_app");

//     // Create a new collection named "test"
//     // await database.createCollection("test");
//     // console.log("Collection 'test' created successfully.");

//     // Log all collection in photo_tagging_app DB //
//     const collections = await database.listCollections().toArray();
//     const collectionNames = collections.map(collection => collection.name);
//     console.log("Collections in the database:", collectionNames);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);



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
