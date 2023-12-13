const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  register,
  login,
  refresh,
  deleteUser,
} = require("../controllers/auth");

const { auth, authAdmin } = require("../middleware/auth");

router.get("/users", authAdmin, getAllUsers);
router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.delete("/users/:id", authAdmin, deleteUser);

module.exports = router;
