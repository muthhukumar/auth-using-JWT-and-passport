const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUser = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
});

module.exports.userSchema = newUser;

require("../database-methods/index");

const User = mongoose.model("User", newUser);

module.exports = User;
