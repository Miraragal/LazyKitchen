var express = require("express");
var createError = require("http-errors");
var mongoose = require("mongoose");
//var logger = require("morgan");
var passport = require("passport");
var config = require("./config");
var indexRoute = require("./routes/indexRoute");
var usersRoute = require("./routes/usersRoute");
var recipesRoute = require("./routes/recipesRoute");
var shopListRoute = require("./routes/recipesRoute");
var uploadRoute = require("./routes/uploadRoute");


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


app.listen(config.PORT, () => {
    console.log('Server started at http://localhost:3001');
});
//Middlewares
app.use(express.json());
app.use(passport.initialize());
app.use("/", indexRoute);
app.use("/users", usersRoute);
app.use("/recipes", recipesRoute);
app.use("imageUpload", uploadRoute);
app.use("/shopping-list", shopListRoute);

//404 + Error handlers
app.use(function (req, res, nest) {
  next(createError(404));
});
app.use(function (err, req, res){
    //developers view
    res.locals.message= err.message;
    res.locals.error= req.app.get('env')=== "development" ? err: {};
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
