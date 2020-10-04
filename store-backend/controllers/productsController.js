const Product = require("../models/productModel");
const User = require("../models/userModel");
const { rejectFilter } = require("../utilities/filterObj");

exports.getAllProducts = (req, res, next) => {
  Product.find({}, (err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};

exports.getAProducts = (req, res, next) => {
  Product.findById(req.params.id, (err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};

exports.createAProducts = (req, res, next) => {
  new Product({
    name: req.body.name,
    model: req.body.model,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    quantity: req.body.quantity,
    category: req.body.category,
    discount: req.body.discount,
    createdBy: req.body.id,
  }).save((err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};

exports.updateAProducts = (req, res, next) => {
  Product.findById(req.params.id, (err, docs) => {
    if (err) {
      return res.send(err);
    }

    if (
      docs.createdBy.toString() === req.user._id.toString() ||
      req.user.role === "admin"
    ) {
      Product.findByIdAndUpdate(
        req.params.id,
        rejectFilter(
          ["id", "_id", "createdBy", "createdAt", "rating"],
          req.body
        ),
        (err, docs) => {
          if (err) {
            return res.json({
              status: "failed",
              message: "failed to update product",
            });
          }
          res.json({
            status: "success",
            message: "Update Done",
            doc: rejectFilter(
              ["id", "_id", "createdBy", "createdAt", "rating"],
              req.body
            ),
          });
        }
      );
    } else {
      res.json({
        status: "failed",
        message: "this product doesn't belong to you",
      });
    }
  });
};

const updateProductFn = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    rejectFilter(
      ["id", "_id", "createdBy", "rating", "createdAt", "__v"],
      req.body
    ),
    { runValidators: true },
    (err, docs) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        status: "success",
        docs,
      });
    }
  );
};

exports.deleteAProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      return next({ statusCode: 501, message: "failed to delete", err });
    }
    res.send(docs);
  });
};
