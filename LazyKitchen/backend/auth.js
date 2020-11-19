const { config } = require("dotenv");
const User = require("./models/userModel");
var passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;

//Auth- Passport+JWT


//OAuth2-Facebook
exports.facebookPassport = passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookClientId,
      clientSecret: config.facebookClientSecret,
      callbackURL: "http://localhost:3000/"

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

exports.verifyUser =passport.authenticate('facebook-token');

exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
      next();
    } else {
      res.status(403).send("You are not authorized to perform this operation!");
      next(err);
    }
  };
