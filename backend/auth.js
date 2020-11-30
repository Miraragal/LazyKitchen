const { config } = require("dotenv");
const User = require("./models/userModel");
var passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

//Auth- Passport+JWT

exports.local = passport.use(new LocalStrategy(User.authenticate()));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("Jwt payload:", jwt_payload)
    User.findOne({ id: jwt_payload._id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
//OAuth2-Facebook
exports.facebookPassport = passport.use(
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

exports.verifyUser = passport.authenticate("facebook-token");

exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(403).send("You are not authorized to perform this operation!");
    next(err);
  }
};
