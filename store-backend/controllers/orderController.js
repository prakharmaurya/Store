const Order = require("../models/orderModel");

// exports.getAllOrder = (req, res, next) => {
//   Product.find({}, (err, docs) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(docs);
//   });
// };

// exports.getAOrder = (req, res, next) => {
//   Product.findById(req.params.id, (err, docs) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(docs);
//   });
// };

exports.finalizeOrder = async (req, res, next) => {
  const doc = await Order.findByIdAndUpdate(
    req.params.id,
    {
      orderStatus: req.body.orderStatus,
    },
    {
      new: true,
    }
  );
  if (!doc) {
    return next("order id not found", 404);
  }
  console.log(doc);
  res.send(doc);
};

exports.createAOrder = (req, res, next) => {
  const order = new Order({
    products: req.body.products,
    userId: req.user._id,
  });

  order.save((err, docs) => {
    if (err) {
      return next(err);
    }
    res.status(200).send(docs);
  });
};
