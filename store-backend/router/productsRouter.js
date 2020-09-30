const router = require("express").Router();
const {
  getAllProducts,
  getAProducts,
  createAProducts,
  updateAProducts,
  deleteAProduct,
} = require("../controllers/productsController");
const { tokenChecker } = require("../controllers/authController");

// router
router.route("/").get(getAllProducts).post(tokenChecker, createAProducts);

router
  .route("/:id")
  .get(getAProducts)
  .patch(tokenChecker, updateAProducts)
  .delete(tokenChecker, deleteAProduct);

module.exports = router;
