const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

function jwtGenerator(user_id, user_name, user_email, user_role) {
  const claims = {
    id: user_id,
    name: user_name,
    email: user_email,
    role: user_role,
  };
  return jwt.sign(claims, process.env.ACCESS_SECRET, {
    expiresIn: "30d",
    jwtid: uuidv4(),
  });
}

function jwtRefresh(user_id, user_name, user_email, user_role) {
  const claims = {
    id: user_id,
    name: user_name,
    email: user_email,
    role: user_role,
  };
  return jwt.sign(claims, process.env.REFRESH_SECRET, {
    expiresIn: "30d",
    jwtid: uuidv4(),
  });
}

module.exports = { jwtGenerator, jwtRefresh };
