const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const doctorsRouter = require("./routes/doctorsRouter");
const patientsRouter = require("./routes/patientsRouter");
const dotenv = require("dotenv");
dotenv.config();

/*Connecting to our database*/
let connectToDatabase = async (uri) => {
  console.log(`Uri: ${uri}`);
  try {
    let connection = await mongoose.connect(uri, { useUnifiedTopology: true });
    console.log("connected to the database");
  } catch (err) {
    console.log("can't connect to the database");
  }
};

//Connecting to our database using our custom made function;
connectToDatabase(process.env.URI);

// Initializing our express app
let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));


//Handling different types of routes
app.use("/users", usersRouter);
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(res.status);
});

module.exports = app;
