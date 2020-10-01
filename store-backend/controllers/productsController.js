const Product = require("../models/productModel");

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
  Product.findByIdAndUpdate(
    req.params.id,
    { model: req.body.model },
    null,
    (err, docs) => {
      if (err) {
        return res.send(err);
      }
      res.send({ model: req.body.model });
    }
  );
};

exports.deleteAProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};
