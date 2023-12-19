const express = require("express");
const router = express.Router();

const { auth, authAdmin } = require("../middleware/auth");

const {
  getAllEquipment,
  getAllUserEquipment,
  addEquipment,
  addUserEquipment,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipment");

router.get("/equipment", auth, getAllEquipment);
router.get("/equipment/:id", auth, getAllUserEquipment);
router.put("/equipment", auth, addEquipment);
router.put("/equipment/:id", auth, addUserEquipment);
router.post("/equipment/update/:id", auth, updateEquipment);
router.delete("/equipment/delete/:id", auth, deleteEquipment);

module.exports = router;
