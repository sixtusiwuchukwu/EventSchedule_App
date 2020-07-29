const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    minlength: 4,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    minlength: 4,
    maxlength: 10,
  },
  password: {
    type: String,
    require: true,
    minlength: 4,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // using bcrypt to hash a user password for security purpose.
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;

      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
