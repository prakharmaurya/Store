const mongoose = require("mongoose");
const { isURL, isAlphanumeric, isAlpha, isFloat } = require("validator");
const orderTxnSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date.now(),
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user id must be provided"],
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        min: [0, "Min order quantity is 0"],
        max: [10, "Max order quantity is 10"],
        required: [true, "Quantity is required"],
      },
    },
  ],
});

const OrderTxn = mongoose.model("OrderTxn", orderTxnSchema, "orderTxns");

module.exports = OrderTxn;
