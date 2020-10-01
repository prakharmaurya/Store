const User = require("../models/userModel");
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
      User.findById(decoded.id, (err, docs) => {
        if (err) {
          return res.send("User DNE");
        } else {
          req.user = docs;
          next();
        }
      });
      // TODO check token expires
    } else {
      res.send("Token modified not alloed");
    }
  });
};

exports.roleChecker = (role) => {
  return (req, res, next) => {
    let flag = false;
    role.forEach((r) => {
      if (r === req.user.role) flag = true;
    });
    if (flag) {
      next();
    } else {
      res.json({
        status: "failed",
        message: "You are not authorized to perform this action",
      });
    }
  };
};

/// conver in async
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
    new User({
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
      createAndSendToken(docs, res);
    });
  });
};

exports.login = (req, res, next) => {
  User.findOne(
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

  User.findByIdAndUpdate(
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
//   User.findByIdAndDelete(req.params.id, (err, docs) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(docs);
//   });
// };
