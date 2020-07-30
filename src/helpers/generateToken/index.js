const jwt = require("jsonwebtoken");

const GenerateToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  console.log(user);
  return jwt.sign({ username, email }, secret, { expiresIn });
};
module.exports = GenerateToken;
