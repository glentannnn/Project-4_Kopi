const express = require("express");
const router = express.Router();

const { auth, authAdmin } = require("../middleware/auth");

const {
  getAllBeans,
  getAllUserBeans,
  addBean,
  addUserBean,
  updateBean,
  deleteBean,
} = require("../controllers/beans");

router.get("/beans", auth, getAllBeans);
router.get("/beans/:id", auth, getAllUserBeans);
router.put("/beans", auth, addBean);
router.put("/beans/:id", auth, addUserBean);
router.post("/beans/update/:id", auth, updateBean);
router.delete("/beans/delete/:id", auth, deleteBean);

module.exports = router;
