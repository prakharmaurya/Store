const router = require("express").Router();
const {
  getAllProducts,
  getAProducts,
  createAProducts,
  updateAProducts,
  restrictProductOnlySelf,
  deleteAProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../controllers/productsController");
const { tokenChecker, roleChecker } = require("../controllers/authController");

// router
router
  .route("/")
  .get(getAllProducts)
  .post(tokenChecker, roleChecker(["admin", "business"]), createAProducts);

router
  .route("/:id")
  .get(getAProducts)
  .patch(
    tokenChecker,
    roleChecker(["admin", "business"]),
    restrictProductOnlySelf,
    uploadProductImages,
    resizeProductImages,
    updateAProducts
  )
  .delete(tokenChecker, roleChecker(["admin", "business"]), deleteAProduct);

module.exports = router;
