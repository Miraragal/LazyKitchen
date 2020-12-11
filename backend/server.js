require("dotenv").config();
var express = require("express");
var createError = require("http-errors");
var path = require("path");
var mongoose = require("mongoose");
//var logger = require("morgan");
var passport = require("passport");
var session = require('express-session')
const cors = require('cors')
var socketio = require("socket.io");
var fs = require("fs");
var https = require("https");
var config = require("./config");
var indexRoute = require("./routes/welcomeRoute");
var usersRoute = require("./routes/usersRoute");
var passportInit = require("./auth.js");
const {  } = require("./config"); 

//Access to mongoDB
const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected correctly to the server"))
  .catch((err) => console.log(err));

var app = express();

//Setup for socketio

const certOptions = {
  // use the server key
  key: fs.readFileSync('backend/server-key.pem'),
 
  // use the server cert
  cert: fs.readFileSync('backend/server-crt.pem'),

  // enforce client certs
  requestCert: true,
  rejectUnauthorized: true,
};
const server = https.createServer(certOptions, app);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Setup for passport
app.use(express.json());
app.use(passport.initialize());

// passportInit();
// Accept requests from the client
// app.use(cors({
//   origin: CLIENT_ORIGIN
// }))

// saveUninitialized: true allows us to attach the socket id to the session before we have athenticated the user
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
// Connecting sockets to the server and adding them to the request so that we can access them later in the controller
const io = socketio(server);
app.set("io", io);

//Middlewares
app.use("/", indexRoute);
app.use("/users", usersRoute);
// app.use("/recipes", recipesRoute);
// app.use("imageUpload", uploadRoute);
// app.use("/shopping-list", shopListRoute);

//404 + Error handlers
app.use(function (req, res, nest) {
  next(createError(404));
});
app.use(function (err, req, res) {
  //developers view
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});


server.listen(config.PORT, () => {
  console.log("Server started at http://localhost:3001");
});
      // app.listen(config.PORT, () => {
      //   console.log("Server started at http://localhost:3001");
      // });

module.exports = app;
module.exports = server;
