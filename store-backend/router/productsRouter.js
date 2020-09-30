const router = require("express").Router();
const {
  getAllProducts,
  getAProducts,
  createAProducts,
  updateAProducts,
  deleteAProduct,
} = require("../controllers/productsController");
const { tokenChecker, roleChecker } = require("../controllers/authController");

// router
router
  .route("/")
  .get(getAllProducts)
  .post(tokenChecker, roleChecker(["business"]), createAProducts);

router
  .route("/:id")
  .get(getAProducts)
  .patch(tokenChecker, roleChecker(["admin", "business"]), updateAProducts)
  .delete(tokenChecker, roleChecker(["admin", "business"]), deleteAProduct);

module.exports = router;
