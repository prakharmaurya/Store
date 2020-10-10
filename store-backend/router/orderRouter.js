const router = require("express").Router();
const { tokenChecker } = require("../controllers/authController");
const orderController = require("../controllers/orderController");

// router
router
  .route("/")
  // .get(getAllProducts)
  .post(tokenChecker, orderController.createAOrder);

router.route("/:id").patch(tokenChecker, orderController.finalizeOrder);

module.exports = router;
