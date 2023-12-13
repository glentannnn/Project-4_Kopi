const express = require("express");
const router = express.Router();

const { auth, authAdmin } = require("../middleware/auth");

const {
  getAllEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipment");

router.get("/equipment", auth, getAllEquipment);
router.put("/equipment", auth, addEquipment);
router.post("/equipment/update/:id", auth, updateEquipment);
router.delete("/equipment/delete/:id", auth, deleteEquipment);

module.exports = router;
