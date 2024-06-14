const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");
const filter = require("../util/filter");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Must be at least 2 characters long"],
      maxlength: [50, "Must be no more than 50 characters long"],
    },
    mobileNumber: {
      type: String,
      required: true,
      validate: [isMobilePhone, "Must be a valid mobile phone number"],
    },
    yearOfPassOut: {
      type: Number,
      required: true,
      min: [1900, "Invalid year"],
      max: [2100, 'Invalid year'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "Must be at least 6 characters long"],
      maxlength: [30, "Must be no more than 30 characters long"],
      validate: {
        validator: (val) => !val.includes(" "),
        message: "Must contain no spaces",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Must be valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Must be at least 8 characters long"],
    },
    biography: {
      type: String,
      default: "",
      maxlength: [250, "Must be at most 250 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (filter.isProfane(this.username)) {
    throw new Error("Username cannot contain profanity");
  }

  if (this.biography.length > 0) {
    this.biography = filter.clean(this.biography);
  }

  next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
