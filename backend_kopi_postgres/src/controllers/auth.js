const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db");
const { jwtGenerator, jwtRefresh } = require("../utils/jwtGenerator");

const getAllUsers = async (req, res) => {
  try {
    const userList = await pool.query(
      "SELECT user_id, user_name, user_email, user_role, user_password FROM users"
    );
    res.json(userList.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT user_id, user_name, user_email, user_role FROM users WHERE user_id = $1",
      [id]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const register = async (req, res) => {
  try {
    // 1. destructure the req.body (name, email, password)
    console.log(req.body);

    const { name, email, password, role } = req.body;

    // 2. check if user exist (if user exist, then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res
        .status(401)
        .json({ status: "error", msg: "user already exist" });
    }

    // 3. bcrypt the user password
    // const saltRound = 10;
    // const salt = await bcrypt.genSalt(saltRound);
    // const bcryptPassword = await bcrypt.hash(password, salt);
    const hash = await bcrypt.hash(password, 12);

    // 4. enter the new user inside our
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, user_role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hash, role]
    );
    // res.json(newUser.rows[0]);

    // 5. generating our jwt token (CHECK WHETHER WE CAN REMOVE THIS)
    const accessToken = jwtGenerator(name, email, password, role);
    res.json({ accessToken });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "server error" });
  }
};

const login = async (req, res) => {
  try {
    // 1. destructure req.body
    const { email, password } = req.body;

    // 2. check if user exist (if use does not exist, then we throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Email or Password is incorrect");
    }

    // 3. check if incoming password is the same as the database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Email or Password is incorrect");
    }

    // 4. give users the jwt token
    const accessToken = jwtGenerator(
      user.rows[0].user_id,
      user.rows[0].user_name,
      email,
      user.rows[0].user_role
    );
    const refreshToken = jwtRefresh(
      user.rows[0].user_id,
      user.rows[0].user_name,
      email,
      user.rows[0].user_role
    );
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "server error" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const claims = {
      email: decoded.email,
      password: decoded.password,
    };

    const accessToken = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "30m",
      jwtid: uuidv4(),
    });

    res.json({ accessToken });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", msg: "refreshing token unsuccessful" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    res.json("User deleted");
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    const hash = await bcrypt.hash(password, 12);

    const updatedUser = await pool.query(
      "UPDATE users SET user_name = $1, user_email = $2, user_password = $3, user_role = $4 WHERE user_id = $5",
      [name, email, hash, role, id]
    );
    res
      .status(200)
      .json({ status: "success", msg: "user updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "server error" });
  }
};

const verify = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "server error" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  register,
  login,
  refresh,
  deleteUser,
  updateUser,
  verify,
};
