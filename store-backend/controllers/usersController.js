const UserModel = require("../models/userModel");

exports.getAllUsers = (req, res, next) => {
  UserModel.find({}, (err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};

exports.getAUser = (req, res, next) => {
  UserModel.findById(req.params.id, (err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};

exports.signUp = (req, res, next) => {
  console.log("createAUser called");
  new UserModel({
    name: req.body.name,
    image: req.body.image,
    email: req.body.email,
    password: req.body.password,
  }).save((err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send({
      name: docs.name,
      image: docs.image,
      email: docs.email,
    });
  });
};

exports.updateAUser = (req, res, next) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    null,
    (err, docs) => {
      if (err) {
        return res.send(err);
      }
      res.send({ user: req.body });
    }
  );
};

exports.deleteAUser = (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      return res.send(err);
    }
    res.send(docs);
  });
};
