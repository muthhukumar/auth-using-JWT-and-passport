const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const User = require("../../../schema/userSchema");

const options = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    await User.findOne({ email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, function (err, isValid) {
            if (err) done(err);
            if (isValid) return done(null, user);
            return done(null, false);
          });
        }
      })
      .catch((err) => done(err));
  })
);
