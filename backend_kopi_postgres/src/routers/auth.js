const express = require("express");
const router = express.Router();

const { getAllUsers, register } = require("../controllers/auth");

router.get("/users", getAllUsers);
router.put("/register", register);

module.exports = router;
