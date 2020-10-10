const mongoose = require("mongoose");
const Product = require("./productModel");
const { isURL, isAlphanumeric, isAlpha, isFloat } = require("validator");

orderSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    products: [
      {
        _id: false,
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true],
        },
        quantity: {
          type: Number,
          default: 1,
          min: [0, "Min order quantity is 0"],
          max: [10, "Max order quantity is 10"],
        },
        price: {
          type: Number,
        },
      },
    ],
    orderLink: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// orderSchema.pre("save", function (next) {
//   const productsArr = [];

//   const asyncLoop = new Promise((resolve, reject) => {
//     let flag = 0;
//     this.products.forEach((e) => {
//       if (e.quantity) {
//         Product.findById(e.productId, (err, doc) => {
//           productsArr.push({
//             productId: e.productId,
//             quantity: e.quantity,
//             price: doc.price,
//           });
//           flag++;
//           if (flag >= this.products.length) {
//             resolve();
//           }
//         });
//       }
//     });
//   });

//   asyncLoop.then(() => {
//     this.orderLink = `http://localhost:${process.env.PORT}/order/${this._id}`;
//     this.products = productsArr;
//     next();
//   });
// });

orderSchema.pre("save", async function (next) {
  const productsArr = [];

  for (let i = 0; i < this.products.length; i++) {
    if (this.products[i].quantity) {
      const doc = await Product.findById(this.products[i].productId);
      productsArr.push({
        productId: this.products[i].productId,
        quantity: this.products[i].quantity,
        price: doc.price,
      });
    }
  }

  this.orderLink = `http://localhost:${process.env.PORT}/order/${this._id}`;
  this.products = productsArr;
  next();
});

orderSchema.post("save", function (doc, next) {
  let totAmmount = 0;

  doc.products.forEach((e) => {
    totAmmount += e.price * e.quantity;
  });

  doc._doc = { ...doc._doc, totalAmmount: totAmmount };
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
