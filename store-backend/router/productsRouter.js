const router = require("express").Router();
const {
  getAllProducts,
  getAProducts,
  createAProducts,
  updateAProducts,
  deleteAProduct,
} = require("../controllers/productsController");

// router
router.route("/").get(getAllProducts).post(createAProducts);

router
  .route("/:id")
  .get(getAProducts)
  .patch(updateAProducts)
  .delete(deleteAProduct);

module.exports = router;
