const express = require("express");
const app = express();
const productsRoute = require("./router/products");

// saves body data in req.body in object format
app.use(express.json());

app.use("/api/v1/products", productsRoute);

// get all routes
app.all("*", (req, res) => {
  res.status(404).json({
    statusCode: 404,
    status: "failed",
    message: "Route not found",
  });
  next();
});

module.exports = app;
