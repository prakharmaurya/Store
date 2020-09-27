const ProductModel = require("../models/productModel");

exports.getAllProducts = (req, res, next) => {
  ProductModel.find({}, (err, result) => {
    res.send(result);
  });
};
exports.getAProducts = (req, res, next) => {
  ProductModel.findById(req.params.id, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.send(result);
  });
};
exports.createAProducts = (req, res, next) => {
  res.send("new Product added");
};
exports.updateAProducts = (req, res, next) => {
  res.send(req.params.id + " product updated");
};
