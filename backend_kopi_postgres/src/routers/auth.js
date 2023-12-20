const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  register,
  login,
  refresh,
  deleteUser,
  verify,
  updateUser,
} = require("../controllers/auth");

const { auth, authAdmin } = require("../middleware/auth");

router.get("/users", authAdmin, getAllUsers);
router.get("/users/:id", auth, getUser);
router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.delete("/users/delete/:id", authAdmin, deleteUser);
router.post("/users/update/:id", authAdmin, updateUser);
router.get("/verify", auth, verify);

module.exports = router;
