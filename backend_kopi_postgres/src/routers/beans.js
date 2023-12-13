const express = require("express");
const router = express.Router();

const { auth, authAdmin } = require("../middleware/auth");

const {} = require("../controllers/beans");

router.get("/beans", auth, getAllBeans);

module.exports = router;
