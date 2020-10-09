const router = require("express").Router();
const { tokenChecker, roleChecker } = require("../controllers/authController");
const { createAOrderTxn } = require("../controllers/orderTxnController");

// router
router
  .route("/")
  // .get(getAllProducts)
  .post(tokenChecker, createAOrderTxn);

// router
//   .route("/:id")
//   .get(getAProducts)
//   .patch(tokenChecker, roleChecker(["admin", "business"]), updateAProducts)
//   .delete(tokenChecker, roleChecker(["admin", "business"]), deleteAProduct);

module.exports = router;
