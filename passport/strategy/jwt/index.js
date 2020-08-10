const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../../../schema/userSchema");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("bearer"),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async function (payload, done) {
    await User.findById(payload.id)
      .select("-password")
      .then((user) => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch((err) => done(err));
  })
);
