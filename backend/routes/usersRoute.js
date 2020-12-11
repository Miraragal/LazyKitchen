var express = require("express");
var passport = require("passport");
var router = express.Router();
const User = require("../models/userModel");
const auth = require("../auth");

//SignUp
router.post("signup", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.name && req.body.lastname) {
          user.name = req.body.name;
          user.lastname = req.body.lastname;
        }
        user.save((err) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration succesfully!!" });
          });
        });
      }
    }
  );
});

//Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = auth.getToken({ _id: req.user._id });
  res.statuCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    status: "You're succesfully logged in",
  });
});

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};
// Routes that are triggered by the React client
router.get(
  "/facebook",
  addSocketIdtoSession,
  passport.authenticate("facebook")
);
// Routes that are triggered by callbacks from OAuth providers once the user has authenticated successfully
router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    if (req.user) {
      const token = auth.getToken({ _id: req.user._id });
      const io = req.app.get('io')
      const { givenName, familyName } = req.user.name
      const user = { 
        name: `${givenName} ${familyName}`,
        photo: req.user.photos[0].value
      }
      io.in(req.session.socketId).emit('facebook', user)
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
  }}
);
// google = (req, res) => {
//   const io = req.app.get('io')
//   const user = { 
//     name: req.user.displayName,
//     photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
//   }
//   io.in(req.session.socketId).emit('google', user)
// }


//User Updates
router.put("/:userId", auth.verifyUser, (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        user.name = req.body.name || user.name;
        user.lastname = req.body.lastname || user.lastname;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.save();
      } else {
        const err = new Error(`User ${req.params.id} not found`);
        err.status = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
});

//Logout
router.get("logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy("Content-Type", "application/json");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
