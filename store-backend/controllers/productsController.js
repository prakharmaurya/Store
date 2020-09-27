const ProductModel = require("../models/productModel");

exports.getAllProducts = (req, res, next) => {
  ProductModel.find({}, (err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};

exports.getAProducts = (req, res, next) => {
  ProductModel.findById(req.params.id, (err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};

exports.createAProducts = (req, res, next) => {
  new ProductModel({
    name: req.body.name,
    model: req.body.model,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    quantity: req.body.quantity,
    category: req.body.category,
    discount: req.body.discount,
  }).save((err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};

exports.updateAProducts = (req, res, next) => {
  ProductModel.findByIdAndUpdate(
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
