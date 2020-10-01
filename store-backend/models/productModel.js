const mongoose = require("mongoose");
const { isURL, isAlphanumeric, isAlpha, isFloat } = require("validator");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    validate: [/^[0-9a-zA-Z\- ]+$/, "Provide a correct Name"],
  },
  model: String,
  image: {
    type: String,
    required: [true, "Product image is required"],
    validate: [isURL, "Provide a correct URL"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true],
  },
  description: {
    type: String,
    validate: [
      /^[0-9a-z\-, ]+$/,
      "Provide a correct description special char allowed(,)",
    ],
  },
  price: {
    type: Number,
    required: [true, "Price required"],
    min: [0, "price must be greater 0"],
    set: (val) => Math.round(val * 100) / 100,
  },
  rating: {
    type: Number,
    default: 0,
    validate: {
      validator: (data) => {
        return data <= 5 && data >= 0;
      },
      message: (props) => `${props.value} is not a valid rating`,
    },
  },
  quantity: {
    type: Number,
    required: [true, "Quantity must be provided"],
    min: [0, "Quantity must be greater 0"],
  },
  category: String,
  discount: {
    type: Number,
    default: 0,
    min: [0, "discount must be greater 0"],
    max: [100, "discount must be greater 100"],
  },
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
