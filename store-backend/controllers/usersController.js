const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { rejectFilter } = require("../utilities/filterObj");

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
  bcrypt.hash(req.body.password, 15, (err, hash) => {
    new UserModel({
      name: req.body.name,
      image: req.body.image,
      email: req.body.email,
      password: hash,
    }).save((err, docs) => {
      if (err) {
        return res.send(err);
      }
      res.send({
        state: "success",
        doc: {
          name: docs.name,
          image: docs.image,
          email: docs.email,
        },
      });
    });
  });
};

exports.login = (req, res, next) => {
  UserModel.findOne(
    { email: req.body.email },
    { password: true },
    (err, docs) => {
      if (err) {
        return res.send(err);
      }
      console.log(docs);
      bcrypt.compare(req.body.password, docs.password, (err, result) => {
        if (result) {
          res.send("login succses");
        } else {
          res.send("password is wrong");
        }
      });
    }
  );
};

exports.updateAUser = (req, res, next) => {
  const rejectArr = ["email", "password"];
  const newObj = rejectFilter(rejectArr, req.body);

  console.log(newObj);

  UserModel.findOneAndUpdate(
    { email: req.body.email },
    newObj,
    { runValidators: true },
    (err, docs) => {
      if (err) {
        return res.send(err);
      }
      res.send({
        status: "success",
        docs: {
          newObj,
        },
      });
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
