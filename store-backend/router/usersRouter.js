const router = require("express").Router();
const {
  getAllUsers,
  getAUser,
  signUp,
  login,
  updateAUser,
  deleteAUser,
} = require("../controllers/usersController");

// router
router.route("/login").post(login);
router.route("/").get(getAllUsers).post(signUp);

router.route("/:id").get(getAUser).patch(updateAUser).delete(deleteAUser);

module.exports = router;
