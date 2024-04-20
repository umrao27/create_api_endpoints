const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      const verified = jwt.verify(token, jwtSecretKey);
      req.userId = verified.id;
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Found" });
  }
};

module.exports = auth;
