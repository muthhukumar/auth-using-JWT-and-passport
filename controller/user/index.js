const bcrypt = require("bcryptjs");
const User = require("../../schema/userSchema");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res, next) => {
  const { firstname, lastname, email, password, age } = req.body;

  if (!firstname || !lastname || !email || !password || !age)
    return next(new Error("check credentials and try again"));

  const newUser = new User({
    firstname,
    lastname,
    email,
    password,
    age,
  });

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new Error("something went wrong, when creating new user"));
  }

  newUser.password = hashedPassword;

  let user;
  try {
    user = await newUser.save();
  } catch (err) {
    return next(new Error("something went wrong, when creating new user"));
  }

  res.json({ user });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new Error("check credetials and try again"));

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  if (!user) return next(new Error("User not found"));

  let isValid;

  try {
    isValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  if (!isValid) return next(new Error("Invalid credentials"));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

module.exports.readUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports.loginUser = (req, res, next) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

module.exports.getAdults = (req, res, next) => {
  User.getAdults(function (err, users) {
    if (err) return next(new Error("something went wrong"));
    res.json({ adults: users });
  });
};
