const pool = require("../db/db");

const getAllEquipment = async (req, res) => {
  try {
    const equipmentList = await pool.query("SELECT * FROM equipment");
    res.status(200).json(equipmentList.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error getting equipment" });
  }
};

const addEquipment = async (req, res) => {
  try {
    const { type, model, modification } = req.body;
    const newEquipment = await pool.query(
      "INSERT INTO equipment (equipment_type, equipment_model, equipment_modification) VALUES ($1, $2, $3)",
      [type, model, modification]
    );
    res
      .status(201)
      .json({ status: "success", msg: "equipment successfully added" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error adding equipment" });
  }
};

const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, model, modification } = req.body;
    const updatedEquipment = await pool.query(
      "UPDATE equipment SET equipment_type = $1, equipment_model = $2, equipment_modification = $3 WHERE equipment_id = $4",
      [type, model, modification, id]
    );
    res
      .status(200)
      .json({ status: "success", msg: "equipment updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error updating equipment" });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEquipment = await pool.query(
      "DELETE FROM equipment WHERE equipment_id = $1",
      [id]
    );
    res
      .status(200)
      .json({ status: "success", msg: "equipment deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error deleting equipment" });
  }
};

module.exports = {
  getAllEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
};
