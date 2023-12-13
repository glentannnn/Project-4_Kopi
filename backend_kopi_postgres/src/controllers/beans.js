const pool = require("../db/db");
const { all } = require("../routers/beans");

const getAllBeans = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.mesage);
    res.status(400).json({ status: "error", msg: "error getting beans" });
  }
};

module.exports = {};
