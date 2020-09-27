const router = require("express").Router();
const {
  getAllProducts,
  getAProducts,
  createAProducts,
  updateAProducts,
} = require("../controllers/productsController");

// router
router.route("/").get(getAllProducts).post(createAProducts);

router.route("/:id").get(getAProducts).patch(updateAProducts);

module.exports = router;
