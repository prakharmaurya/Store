const OrderTxn = require("../models/orderTxnModel");

// exports.getAllOrderTxn = (req, res, next) => {
//   Product.find({}, (err, docs) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(docs);
//   });
// };

// exports.getAOrderTxn = (req, res, next) => {
//   Product.findById(req.params.id, (err, docs) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(docs);
//   });
// };

exports.createAOrderTxn = (req, res, next) => {
  const orderTxn = new OrderTxn({
    products: req.body.products,
    userId: req.user._id,
  });

  orderTxn.save((err, docs) => {
    if (err) {
      return next(err);
    }
    res.status(200).send(docs);
  });
};

// exports.deleteAOrderTxn = (req, res, next) => {
//   Product.findByIdAndDelete(req.params.id, (err, docs) => {
//     if (err) {
//       return next({ statusCode: 501, message: "failed to delete", err });
//     }
//     res.send(docs);
//   });
// };
