const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const pool = require("../db/db");

const getAllUsers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.mesage);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const register = async (req, res) => {
  try {
    //1. destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    //2. check if user exist (if user exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    res.json(user.rows);

    // if (user.rowCount.length !== 0) {
    //   return res
    //     .status(401)
    //     .send({ status: "error", msg: "user already exist" });
    // }

    // //3. bcrypt the user password
    // const saltRound = 10;
    // const salt = await bcrypt.genSalt(saltRound);

    // const bcryptPassword = await bcrypt.hash(password, salt);

    // //4. enter the new user inside our
    // const newUser = await pool.query(
    //   "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
    //   [name, email, bcryptPassword]
    // );
    // res.json(newUser.rows[0]);
    //5. generating our jwt token
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ status: "error", msg: "server error" });
  }
};

module.exports = { getAllUsers, register };
