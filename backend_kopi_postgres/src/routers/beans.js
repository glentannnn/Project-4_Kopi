const express = require("express");
const router = express.Router();

const { auth, authAdmin } = require("../middleware/auth");

const {
  getAllBeans,
  addBean,
  updateBean,
  deleteBean,
} = require("../controllers/beans");

router.get("/beans", auth, getAllBeans);
router.put("/beans", auth, addBean);
router.post("/beans/update/:id", auth, updateBean);
router.delete("/beans/delete/:id", auth, deleteBean);

module.exports = router;
