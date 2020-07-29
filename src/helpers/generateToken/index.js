const jwt = require("jsonwebtoken");

const GenerateToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};
module.exports = GenerateToken;
