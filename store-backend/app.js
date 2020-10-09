const express = require("express");
const app = express();
const productsRoute = require("./router/productsRouter");
const usersRoute = require("./router/usersRouter");
const orderTxnRoute = require("./router/orderTxnRouter");

// saves body data in req.body in object format
app.use(express.json());

app.use("/api/v1/products", productsRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/ordertxn", orderTxnRoute);

// get all routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    status: "failed",
    message: "Route not found",
  });
  next();
});

app.use((e, req, res, next) => {
  if (e) {
    // if (process.env.NODE_ENV === "development") {
    //   sendErrorDev(err, res);
    // } else if (process.env.NODE_ENV === "production") {
    //   sendErrorProd(err, res);
    // }
    res.status(e.statusCode ? e.statusCode : 500).json({
      status: "failed",
      message: e.message,
      error: e.err,
      totalError: e.stack,
    });
  }
});

module.exports = app;
