const router = require("express").Router();
const {
  getAllUsers,
  getAUser,
  signUp,
  updateAUser,
  deleteAUser,
} = require("../controllers/usersController");

// router
router.route("/").get(getAllUsers).post(signUp);

router.route("/:id").get(getAUser).patch(updateAUser).delete(deleteAUser);

module.exports = router;
