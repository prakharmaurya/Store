const router = require("express").Router();
const {
  getAllUsers,
  getAUser,
  updateAUser,
  deleteAUser,
} = require("../controllers/usersController");

const {
  signUp,
  login,
  updateMe,
  tokenChecker,
} = require("../controllers/authController");

// router
router.route("/login").post(login);
router.route("/signup").post(signUp);

router.route("/updateMe").patch(tokenChecker, updateMe);

router.route("/").get(getAllUsers);

router.route("/:id").get(getAUser).patch(updateAUser).delete(deleteAUser);

module.exports = router;
