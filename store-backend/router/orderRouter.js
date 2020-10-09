const router = require("express").Router();
const { tokenChecker, roleChecker } = require("../controllers/authController");
const { createAOrder } = require("../controllers/orderController");

// router
router
  .route("/")
  // .get(getAllProducts)
  .post(tokenChecker, createAOrder);

// router
//   .route("/:id")
//   .get(getAProducts)
//   .patch(tokenChecker, roleChecker(["admin", "business"]), updateAProducts)
//   .delete(tokenChecker, roleChecker(["admin", "business"]), deleteAProduct);

module.exports = router;
