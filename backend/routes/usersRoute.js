var express = require("express");
var passport = require("passport");
var router = express.Router();
const User = require("../models/userModel");
const auth = require("../auth");
// Middleware CORS-- control de acceso en los navigadore. Definimos solicitudes desde http de origen cruzado

// // Get User Listing
// router.get("/", auth.verifyUser, auth.veryAdmin, (req, res, next) => {
//   User.find()
//     .then((user) => {
//       res.statusCode = 200;
//       res.setHeader("Content-Type", "application/json");
//       res.json(user);
//     })
//     .catch((err) => next(err));
// });

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

router.get(
  "/facebook/token",
  passport.authenticate("facebook-token"),
  (req, res) => {
    if (req.user) {
      const token = auth.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
    }
  }
);
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
