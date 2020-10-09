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

// exports.deleteAOrder = (req, res, next) => {
//   Product.findByIdAndDelete(req.params.id, (err, docs) => {
//     if (err) {
//       return next({ statusCode: 501, message: "failed to delete", err });
//     }
//     res.send(docs);
//   });
// };
