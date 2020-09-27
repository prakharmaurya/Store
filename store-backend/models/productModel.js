const mongoose = require("mongoose");
const { isURL, isAlphanumeric, isAlpha, isFloat } = require("validator");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    validate: [/^[0-9a-z\- ]+$/, "Provide a correct Name"],
  },
  model: String,
  image: {
    type: String,
    required: [true, "Product image is required"],
    validate: [isURL, "Provide a correct URL"],
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
        console.log(data);
        return data <= 5 && data >= 0;
      },
      message: (props) => `${props.value} is not a valid rating`,
    },
  },
  quantity: Number,
  category: String,
  discount: {
    type: Number,
    default: 0,
    min: [0, "discount must be greater 0"],
    max: [100, "discount must be greater 100"],
  },
});
const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
