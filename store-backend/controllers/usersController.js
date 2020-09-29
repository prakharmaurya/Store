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
