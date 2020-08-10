const router = require("express").Router();
const passport = require("passport");

const userController = require("../controller/user/index");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post(
  "/auth/jwt",
  passport.authenticate("jwt", { session: false }),
  userController.readUser
);

router.post(
  "/auth/login",
  passport.authenticate("local", { session: false }),
  userController.loginUser
);

module.exports = router;
