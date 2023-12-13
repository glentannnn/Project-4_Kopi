const pool = require("../db/db");
// const { all } = require("../routers/beans");

const getAllBeans = async (req, res) => {
  try {
    const beansList = await pool.query("SELECT * FROM beans");
    res.status(200).json(beansList.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error getting beans" });
  }
};

const addBean = async (req, res) => {
  try {
    const { country, region, type, taste, roastdate, prevgrindsize, remarks } =
      req.body;
    const newBean = await pool.query(
      "INSERT INTO beans (bean_country, bean_region, bean_type, bean_taste, bean_roastdate, bean_prevgrindsize, bean_remarks) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [country, region, type, taste, roastdate, prevgrindsize, remarks]
    );
    res.status(201).json({ status: "success", msg: "bean added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error adding bean" });
  }
};

const updateBean = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, region, type, taste, roastdate, prevgrindsize, remarks } =
      req.body;
    const updatedBean = await pool.query(
      "UPDATE beans SET bean_country = $1, bean_region = $2, bean_type = $3, bean_taste = $4, bean_roastdate = $5, bean_prevgrindsize = $6, bean_remarks = $7 WHERE bean_id = $8",
      [country, region, type, taste, roastdate, prevgrindsize, remarks, id]
    );
    res
      .status(200)
      .json({ status: "success", msg: "bean updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error updating bean" });
  }
};

const deleteBean = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBean = await pool.query(
      "DELETE FROM beans WHERE bean_id = $1",
      [id]
    );
    res
      .status(200)
      .json({ status: "success", msg: "bean deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error updating bean" });
  }
};

module.exports = { getAllBeans, addBean, updateBean, deleteBean };
