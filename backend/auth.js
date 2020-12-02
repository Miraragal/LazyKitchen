// const { config } = require("dotenv");
const config = require("./config.js");
const User = require("./models/userModel");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  FacebookStrategy = require("passport-facebook").Strategy,
  JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const { serializeUser } = require("passport");

//Auth- Passport+JWT
exports.localPassport = passport.use(new LocalStrategy(User.authenticate()));

/* Serialize user session */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Get Jason Web Token */
exports.getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.secretOrKey,
    { expiresIn: 43200 }
  ); //12h
};
/* JWT */
require("dotenv").config();
const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = config.secretOrKey;

exports.jwtPassport = (passport) => {
  passport.use(
    new JwtStrategy(jwtOpts, (jwt_payload, done) => {
      console.log("Jwt payload:", jwt_payload);
      User.findOne({ id: jwt_payload._id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or create a new account...
        }
      });
    })
  );
};

//OAuth2-Facebook
exports.facebookPassport = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebookClientId,
        clientSecret: config.facebookClientSecret,
        callbackURL: "http://localhost:3000/",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findorCreate({ facebookId: profile.id }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!err & user) {
            done(null, user);
          } else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.Id;
            user.name = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.email = profile.email;
            user.save((err, user) => {
              if (err) {
                return done(err, false);
              } else {
                return done(null, user);
              }
            });
          }
        });
      }
    )
  );
};

exports.verifyUser = passport.authenticate("facebook-token");
//exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(403).send("You are not authorized to perform this operation!");
    next(err);
  }
};
