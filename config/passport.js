let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      db.User.findOne({
        where: {
          email: email
        }
      }).then(dbUser => {
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect Email."
          });
        } else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect Password"
          });
        }
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
