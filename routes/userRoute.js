const router = require("express").Router();
const passport = require("passport");
const rateLimit = require("express-rate-limit");

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour",
});


const userController = require("../controller/user/index");

router.post("/signup",createAccountLimiter, userController.signup);

router.post("/login", userController.login);

router.get(
  "/readuser",
  passport.authenticate("jwt", { session: false }),
  userController.readUser
);

router.post(
  "/auth/login",
  passport.authenticate("local", { session: false }),
  userController.loginUser
);

router.get("/adults", userController.getAdults);

module.exports = router;
