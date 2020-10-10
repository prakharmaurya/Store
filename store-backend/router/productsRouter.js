const router = require("express").Router();
const {
  getAllProducts,
  getAProducts,
  createAProducts,
  updateAProducts,
  deleteAProduct,
} = require("../controllers/productsController");
const { tokenChecker, roleChecker } = require("../controllers/authController");

const multer = require("multer");
const upload = multer({ dest: "./public/products" });
var cpUpload = upload.fields([{ name: "images", maxCount: 8 }]);

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
    cpUpload,
    updateAProducts
  )
  .delete(tokenChecker, roleChecker(["admin", "business"]), deleteAProduct);

module.exports = router;
