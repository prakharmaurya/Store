const express = require("express");
const app = express();

// saves body data in req.body in object format
app.use(express.json());

// get all routes
app.get("*", (req, res) => {
  res.status(404).json({
    statusCode: 404,
    status: "failed",
    message: "Route not found",
  });
});

module.exports = app;
