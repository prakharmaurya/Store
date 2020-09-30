const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { rejectFilter } = require("../utilities/filterObj");
const jwt = require("jsonwebtoken");

exports.tokenChecker = (req, res, next) => {
  // Check token if exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log(req.headers);

  // validate token
  if (!token) {
    return res.json({
      status: "failed",
      messege: "Not authorized..",
    });
  }

  // Check if user still exists
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      req.body.id = decoded.id;
      next();
    } else {
      res.send("Token modified not alloed");
    }
  });
};

exports.roleChecker = (role) => {
  return (req, res, next) => {
    UserModel.findById(req.body.id, (err, docs) => {
      // arr traverse without flag
      role.forEach((r) => {
        if (r === docs.role) {
          next();
          return;
        }
      });
      res.json({
        status: "failed",
        message: "You are not authorized to perform this action",
      });
    });
  };
};

// conver in async
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("token", token, cookieOptions);

  res.json({
    status: "success",
    token,
  });
};

exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    new UserModel({
      name: req.body.name,
      image: req.body.image,
      email: req.body.email,
      role: req.body.role
        ? req.body.role === "business"
          ? "business"
          : "user"
        : "user",
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
    { password: true, _id: true },
    (err, docs) => {
      if (err) {
        return res.send(err);
      }
      bcrypt.compare(req.body.password, docs.password, (err, result) => {
        if (result) {
          createAndSendToken(docs, res);
        } else {
          res.send("password is wrong");
        }
      });
    }
  );
};

exports.updateMe = (req, res, next) => {
  const rejectArr = ["id", "_id", "email", "password"];
  const newObj = rejectFilter(rejectArr, req.body);

  UserModel.findByIdAndUpdate(
    req.body.id,
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

// exports.deleteMe = (req, res, next) => {
//   UserModel.findByIdAndDelete(req.params.id, (err, docs) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(docs);
//   });
// };
