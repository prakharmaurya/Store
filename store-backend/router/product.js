const router = require("express").Router();

router
  .get("/", (req, res, next) => {
    res.send("hi");
  })
  .get("/:id", (req, res, next) => {
    res.send("hello " + req.params.id);
  })
  .post("/", (req, res, next) => {
    res.send("this is post");
  })
  .patch("/:id", (req, res, next) => {
    res.send(" patch  " + req.params.id);
  });

module.exports = router;
