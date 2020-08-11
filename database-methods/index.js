const { userSchema } = require("../schema/userSchema");

userSchema.methods.getIfadult = function () {
  return this.age > 18;
};

userSchema.statics.getAdults = async function (callback) {
  this.find({ age: { $gt: 18 } }, callback);
};

userSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});
