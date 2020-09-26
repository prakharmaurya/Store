const router = require("express").Router();
const {
  getAllProducts,
  getAProducts,
  createAProducts,
  updateAProducts,
} = require("../controllers/products");

router
  .get("/", getAllProducts)
  .get("/:id", getAProducts)
  .post("/", createAProducts)
  .patch("/:id", updateAProducts);

module.exports = router;
