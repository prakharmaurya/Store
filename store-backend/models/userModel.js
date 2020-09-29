const mongoose = require("mongoose");
const { isURL, isAlphanumeric, isEmail, isFloat } = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Provide a correct Email"],
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: [true, "Name is required"],
    min: [4, "Pasword min length is required 4s"],
    select: false,
  },
  image: {
    type: String,
    validate: [isURL, "Provide a correct URL"],
    default: "https://source.unsplash.com/180x180?profile",
  },
});
const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
