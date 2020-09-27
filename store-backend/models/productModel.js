const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  model: String,
  image: String,
  description: String,
  price: Number,
  rating: Number,
  quantity: Number,
  category: String,
  discount: Number,
});
const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
