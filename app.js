var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');  // add at the top 

console.log("1-Beginning of app.js...");

// Import the database connection
const connectToDatabase = require('./model/database');

// var indexRouter = require('./routes/index'); -- removed idex.js route
var usersRouter = require('./routes/users');
var profilesRouter = require('./routes/profiles');
var mealsRouter = require('./routes/meals');

console.log("2-Router was imported...");

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Serve static files from the React frontend app
//This is to link app.js to the client side
app.use(express.static(path.join(__dirname, 'client','dist')));

console.log("3-Static files were served...");

app.get("/", function(req, res, next) {
  res.send("Access the API at path /api");
});

// Middleware to create a database connection for each request
connectToDatabase();

console.log("5-Connection with db...");

// app.use('/api/', indexRouter); -- removed index.js route
app.use('/api/users', usersRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/meals', mealsRouter);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "client","dist", "index.html"));
});

console.log("6- Send to index.html...");

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
  res.render('error',{
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

console.log("7- End of app.js...");

// Set up server to listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
